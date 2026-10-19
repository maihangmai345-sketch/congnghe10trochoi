export const GOOGLE_SHEET_ID = "16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY";
export const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCQDHbX_Iq8A11yKhekUIibCS1DHiygOZZhrtZNvlv2CXkVSGggcsF9IsUh2AiJ-NQ/exec";

export const APPS_SCRIPT_SOURCE_CODE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO HỆ THỐNG ÔN TẬP CÔNG NGHỆ 10
 * BẢNG TÍNH: https://docs.google.com/spreadsheets/d/16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY
 * 
 * TÍNH NĂNG:
 * 1. Lưu mỗi lượt chơi chính một dòng từ hàng 4 của sheet 'KET_QUA_TRO_CHOI'
 * 2. Khi ôn lại câu sai: Chỉ cập nhật cột M–O của dòng cũ bằng cách dò Mã lượt chơi
 * 3. Tự động thống kê, tổng hợp dữ liệu học sinh vào sheet 'TRO_CHOI_HOC_TAP'
 * =========================================================================
 */

var SPREADSHEET_ID = "16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY";
var SHEET_RESULTS = "KET_QUA_TRO_CHOI";
var SHEET_STATS = "TRO_CHOI_HOC_TAP";
var START_ROW = 4; // Bắt đầu lưu từ hàng 4

/**
 * Xử lý khi nhận yêu cầu POST từ Web App
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // Khóa 30 giây để tránh xung đột ghi đồng thời

  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var payload = JSON.parse(rawData);
    var action = payload.action || "SAVE_INITIAL_SCORE";

    var ss;
    if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
      try {
        ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      } catch (err) {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      }
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var resultSheet = getOrCreateResultsSheet(ss);
    var responseData = {};

    if (action === "SAVE_INITIAL_SCORE") {
      // 1. Lưu lượt chơi chính mới từ hàng 4
      var newRowIndex = findNextAvailableRow(resultSheet, START_ROW);
      
      var rowValues = [
        payload.timestamp || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss"), // Cột A (1): Thời gian
        payload.sessionId || ("SES-" + new Date().getTime()),                                 // Cột B (2): Mã lượt chơi
        payload.studentId || "",                                                               // Cột C (3): Mã học sinh (STT)
        payload.studentName || "",                                                             // Cột D (4): Họ và tên
        payload.className || "",                                                               // Cột E (5): Lớp
        payload.lessonTitle || payload.lessonId || "",                                         // Cột F (6): Bài học
        payload.gameModeTitle || payload.gameMode || "",                                       // Cột G (7): Trò chơi
        payload.setIndex ? ("Bộ " + payload.setIndex) : "Bộ 1",                               // Cột H (8): Bộ câu hỏi
        payload.score || 0,                                                                    // Cột I (9): Điểm số lần đầu
        payload.totalQuestions || 0,                                                           // Cột J (10): Tổng số câu
        payload.correctCount || 0,                                                             // Cột K (11): Số câu đúng
        payload.wrongCount || 0,                                                               // Cột L (12): Số câu sai
        "",                                                                                    // Cột M (13): Điểm sau ôn lại
        "",                                                                                    // Cột N (14): Số câu đúng sau ôn
        "",                                                                                    // Cột O (15): Thời gian ôn lại
        "Hoàn thành lần đầu"                                                                   // Cột P (16): Trạng thái
      ];

      resultSheet.getRange(newRowIndex, 1, 1, rowValues.length).setValues([rowValues]);

      // Định dạng dòng vừa ghi
      resultSheet.getRange(newRowIndex, 1, 1, rowValues.length)
        .setFontFamily("Arial")
        .setFontSize(10)
        .setVerticalAlignment("middle");
      resultSheet.getRange(newRowIndex, 1, 1, 8).setHorizontalAlignment("left");
      resultSheet.getRange(newRowIndex, 9, 1, 7).setHorizontalAlignment("center");

      // Cập nhật thống kê tự động
      updateStatsSheet(ss);

      responseData = {
        success: true,
        action: "SAVE_INITIAL_SCORE",
        row: newRowIndex,
        sessionId: payload.sessionId,
        message: "Đã lưu lượt chơi chính thành công vào hàng " + newRowIndex
      };

    } else if (action === "UPDATE_REVIEW_SCORE") {
      // 2. Ôn lại câu sai: Dò Mã lượt chơi (Cột B) và chỉ cập nhật cột M–O
      var targetSessionId = payload.sessionId;
      var foundRow = findRowBySessionId(resultSheet, targetSessionId, START_ROW);

      if (foundRow > 0) {
        var reviewScore = payload.reviewedScore !== undefined ? payload.reviewedScore : payload.score;
        var reviewCorrect = payload.reviewedCorrectCount !== undefined ? payload.reviewedCorrectCount : payload.correctCount;
        var reviewTime = payload.reviewedTimestamp || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");

        // Cột M (13): Điểm sau ôn lại
        // Cột N (14): Số câu đúng sau ôn
        // Cột O (15): Thời gian ôn lại
        resultSheet.getRange(foundRow, 13, 1, 3).setValues([[
          reviewScore,
          reviewCorrect,
          reviewTime
        ]]);

        // Cập nhật trạng thái tại cột P
        resultSheet.getRange(foundRow, 16).setValue("Đã ôn lại câu sai");
        resultSheet.getRange(foundRow, 13, 1, 4).setBackground("#e6f4ea"); // Màu xanh lá nhạt báo đã ôn

        // Cập nhật thống kê tự động
        updateStatsSheet(ss);

        responseData = {
          success: true,
          action: "UPDATE_REVIEW_SCORE",
          row: foundRow,
          sessionId: targetSessionId,
          message: "Đã cập nhật kết quả ôn lại vào cột M-O tại hàng " + foundRow
        };
      } else {
        responseData = {
          success: false,
          action: "UPDATE_REVIEW_SCORE",
          error: "Không tìm thấy Mã lượt chơi: " + targetSessionId
        };
      }
    } else {
      responseData = { success: false, error: "Hành động không hợp lệ" };
    }

    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý khi nhận yêu cầu GET (kiểm tra trạng thái)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "ONLINE",
      app: "Ôn Tập Công Nghệ 10",
      spreadsheetId: SPREADSHEET_ID,
      serverTime: Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss")
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Khởi tạo hoặc lấy sheet KET_QUA_TRO_CHOI và tạo tiêu đề chuẩn từ hàng 1 đến 3
 */
function getOrCreateResultsSheet(ss) {
  var sheet = ss.getSheetByName(SHEET_RESULTS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RESULTS);
  }

  // Nếu hàng 3 chưa có tiêu đề, tự động tạo cấu trúc bảng chuẩn
  var valC3 = sheet.getRange(3, 1).getValue();
  if (!valC3 || valC3 === "") {
    sheet.getRange(1, 1).setValue("BẢNG THEO DÕI KẾT QUẢ ÔN TẬP CÔNG NGHỆ 10 - KẾT NỐI TRI THỨC")
      .setFontSize(14).setFontWeight("bold").setFontColor("#1a73e8");
    sheet.getRange(2, 1).setValue("(Dữ liệu lưu tự động từ hàng 4 - Cột M đến O cập nhật khi ôn lại câu sai)")
      .setFontSize(10).setFontStyle("italic").setFontColor("#5f6368");

    var headers = [
      "Thời Gian",          // A (1)
      "Mã Lượt Chơi",       // B (2)
      "Mã HS (STT)",        // C (3)
      "Họ Và Tên",          // D (4)
      "Lớp",                // E (5)
      "Bài Học",            // F (6)
      "Trò Chơi",           // G (7)
      "Bộ Câu Hỏi",         // H (8)
      "Điểm Lần Đầu",       // I (9)
      "Tổng Số Câu",        // J (10)
      "Số Câu Đúng",        // K (11)
      "Số Câu Sai",         // L (12)
      "Điểm Sau Ôn (Cột M)",// M (13)
      "Đúng Sau Ôn (Cột N)",// N (14)
      "TG Ôn Lại (Cột O)",  // O (15)
      "Trạng Thái"          // P (16)
    ];

    var headerRange = sheet.getRange(3, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground("#1a73e8").setFontColor("#ffffff").setFontWeight("bold").setHorizontalAlignment("center");
    sheet.setRowHeight(3, 30);
    sheet.setFrozenRows(3);

    // Đặt độ rộng các cột tối ưu
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 80);
    sheet.setColumnWidth(4, 180);
    sheet.setColumnWidth(5, 80);
    sheet.setColumnWidth(6, 170);
    sheet.setColumnWidth(7, 160);
    sheet.setColumnWidth(8, 90);
    sheet.setColumnWidth(9, 110);
    sheet.setColumnWidth(10, 100);
    sheet.setColumnWidth(11, 100);
    sheet.setColumnWidth(12, 100);
    sheet.setColumnWidth(13, 140);
    sheet.setColumnWidth(14, 140);
    sheet.setColumnWidth(15, 150);
    sheet.setColumnWidth(16, 140);
  }

  return sheet;
}

/**
 * Tìm dòng còn trống tiếp theo từ hàng START_ROW (hàng 4)
 */
function findNextAvailableRow(sheet, startRow) {
  var lastRow = sheet.getLastRow();
  if (lastRow < startRow) {
    return startRow;
  }
  // Quét cột B (Mã Lượt Chơi) để tìm ô trống đầu tiên
  var values = sheet.getRange(startRow, 2, (lastRow - startRow + 1) || 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (!values[i][0] || values[i][0].toString().trim() === "") {
      return startRow + i;
    }
  }
  return lastRow + 1;
}

/**
 * Dò tìm dòng có Mã lượt chơi (Cột B) khớp với targetSessionId
 */
function findRowBySessionId(sheet, targetSessionId, startRow) {
  var lastRow = sheet.getLastRow();
  if (lastRow < startRow) return -1;
  var data = sheet.getRange(startRow, 2, lastRow - startRow + 1, 1).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().trim() === targetSessionId.toString().trim()) {
      return startRow + i;
    }
  }
  return -1;
}

/**
 * Tự động tổng hợp và thống kê học tập vào sheet TRO_CHOI_HOC_TAP
 */
function updateStatsSheet(ss) {
  var resultsSheet = ss.getSheetByName(SHEET_RESULTS);
  if (!resultsSheet) return;

  var statsSheet = ss.getSheetByName(SHEET_STATS);
  if (!statsSheet) {
    statsSheet = ss.insertSheet(SHEET_STATS);
  }

  var lastRow = resultsSheet.getLastRow();
  if (lastRow < START_ROW) return;

  var data = resultsSheet.getRange(START_ROW, 1, lastRow - START_ROW + 1, 16).getValues();
  var studentMap = {};

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var sessId = row[1];
    var studentId = row[2];
    var studentName = row[3];
    var className = row[4];
    var scoreInit = Number(row[8]) || 0;
    var reviewedScore = row[12] !== "" ? Number(row[12]) : null;
    var finalScore = reviewedScore !== null ? Math.max(scoreInit, reviewedScore) : scoreInit;

    if (!studentName) continue;
    var key = className + "_" + studentId + "_" + studentName;

    if (!studentMap[key]) {
      studentMap[key] = {
        className: className,
        studentId: studentId,
        studentName: studentName,
        totalGames: 0,
        totalScore: 0,
        maxScore: 0,
        reviewedCount: 0,
        lastPlay: row[0]
      };
    }

    studentMap[key].totalGames += 1;
    studentMap[key].totalScore += finalScore;
    if (finalScore > studentMap[key].maxScore) {
      studentMap[key].maxScore = finalScore;
    }
    if (reviewedScore !== null) {
      studentMap[key].reviewedCount += 1;
    }
    studentMap[key].lastPlay = row[0];
  }

  // Thiết lập tiêu đề sheet TRO_CHOI_HOC_TAP
  statsSheet.clear();
  statsSheet.getRange(1, 1).setValue("BẢNG TỔNG HỢP VÀ THỐNG KÊ HỌC TẬP - CÔNG NGHỆ 10")
    .setFontSize(14).setFontWeight("bold").setFontColor("#0d652d");
  statsSheet.getRange(2, 1).setValue("Cập nhật tự động: " + Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss"))
    .setFontSize(10).setFontStyle("italic").setFontColor("#5f6368");

  var statHeaders = [
    "STT",
    "Lớp",
    "Mã HS",
    "Họ Và Tên Học Sinh",
    "Số Lượt Chơi",
    "Điểm Trung Bình",
    "Điểm Cao Nhất",
    "Lượt Đã Ôn Lại",
    "Thời Gian Chơi Gần Nhất",
    "Đánh Giá Rèn Luyện"
  ];

  statsSheet.getRange(3, 1, 1, statHeaders.length)
    .setValues([statHeaders])
    .setBackground("#0d652d")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  var statRows = [];
  var index = 1;
  for (var k in studentMap) {
    var item = studentMap[k];
    var avgScore = item.totalGames > 0 ? (item.totalScore / item.totalGames).toFixed(1) : 0;
    var rating = "Cần cố gắng";
    if (avgScore >= 8.5) rating = "Xuất sắc ⭐";
    else if (avgScore >= 7.0) rating = "Đạt Khá tốt 👍";
    else if (avgScore >= 5.0) rating = "Đạt trung bình";

    statRows.push([
      index++,
      item.className,
      item.studentId,
      item.studentName,
      item.totalGames,
      Number(avgScore),
      item.maxScore,
      item.reviewedCount,
      item.lastPlay,
      rating
    ]);
  }

  if (statRows.length > 0) {
    statsSheet.getRange(4, 1, statRows.length, statHeaders.length).setValues(statRows);
    statsSheet.getRange(4, 1, statRows.length, statHeaders.length)
      .setFontFamily("Arial")
      .setFontSize(10)
      .setVerticalAlignment("middle");
    statsSheet.getRange(4, 1, statRows.length, 4).setHorizontalAlignment("left");
    statsSheet.getRange(4, 5, statRows.length, 6).setHorizontalAlignment("center");
  }

  statsSheet.setFrozenRows(3);
}
`;
