import { MATCHING_QUESTIONS } from '../data/questions/matchingQuestions';
import { DRAG_DROP_QUESTIONS } from '../data/questions/dragDropQuestions';
import { CLASSIFICATION_QUESTIONS } from '../data/questions/classificationQuestions';
import { ORDERING_QUESTIONS } from '../data/questions/orderingQuestions';
import { ENGINEER_QUESTIONS } from '../data/questions/engineerQuestions';
import { LESSONS_META } from '../data/questions';

export function getAllQuestionsStructured() {
  return {
    meta: {
      title: 'Ngân Hàng Câu Hỏi & Bài Tập Ôn Tập Công Nghệ 10',
      textbook: 'Bộ sách Kết nối tri thức với cuộc sống',
      teacher: 'Cô Mai Hằng (GVMaiHang)',
      schoolYear: '2025 - 2026',
      totalSets: {
        matching: MATCHING_QUESTIONS.length,
        dragDrop: DRAG_DROP_QUESTIONS.length,
        classification: CLASSIFICATION_QUESTIONS.length,
        ordering: ORDERING_QUESTIONS.length,
        engineer: ENGINEER_QUESTIONS.length,
      },
    },
    lessons: LESSONS_META,
    matching: MATCHING_QUESTIONS,
    dragDrop: DRAG_DROP_QUESTIONS,
    classification: CLASSIFICATION_QUESTIONS,
    ordering: ORDERING_QUESTIONS,
    engineer: ENGINEER_QUESTIONS,
  };
}

export function generateQuestionBankWordHtml(): string {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Ngân Hàng Câu Hỏi Ôn Tập Công Nghệ 10 - Cô Mai Hằng</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt;
      line-height: 1.45;
      color: #111827;
      margin: 2cm;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .header-table td {
      vertical-align: top;
      border: none;
      padding: 0;
    }
    .school-name {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
    }
    .title-doc {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      color: #0369a1;
      margin: 15px 0 5px 0;
    }
    .subtitle-doc {
      font-size: 12pt;
      font-style: italic;
      text-align: center;
      margin-bottom: 25px;
      color: #4b5563;
    }
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      color: #1e3a8a;
      background-color: #e0f2fe;
      padding: 8px 12px;
      border-left: 5px solid #0284c7;
      margin-top: 25px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }
    .game-title {
      font-size: 13pt;
      font-weight: bold;
      color: #7c2d12;
      background-color: #fef3c7;
      padding: 6px 10px;
      margin-top: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      page-break-after: avoid;
    }
    .question-block {
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px dashed #cbd5e1;
      page-break-inside: avoid;
    }
    .q-title {
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .q-desc {
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #94a3b8;
      padding: 6px 10px;
      text-align: left;
      font-size: 11pt;
    }
    table.data-table th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #1e293b;
    }
    .answer-key {
      background-color: #ecfdf5;
      border: 1px solid #10b981;
      border-radius: 6px;
      padding: 8px 12px;
      margin-top: 8px;
      font-size: 11.5pt;
    }
    .answer-key b {
      color: #047857;
    }
    .scenario-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #6366f1;
      padding: 10px 14px;
      margin: 8px 0;
      border-radius: 4px;
    }
    .role-badge {
      display: inline-block;
      font-size: 10pt;
      font-weight: bold;
      background-color: #e0e7ff;
      color: #3730a3;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .option-item {
      margin: 4px 0 4px 18px;
    }
    .option-item.correct {
      font-weight: bold;
      color: #047857;
    }
    .footer-note {
      text-align: center;
      font-size: 10.5pt;
      color: #64748b;
      margin-top: 40px;
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <table class="header-table">
    <tr>
      <td style="width: 50%; text-align: center;">
        <div class="school-name">TRƯỜNG THPT</div>
        <div style="font-weight: bold;">TỔ BỘ MÔN CÔNG NGHỆ 10</div>
        <div style="font-size: 10.5pt; color: #4b5563;">Lớp: 10C05 • 10C06</div>
      </td>
      <td style="width: 50%; text-align: center;">
        <div style="font-weight: bold;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div style="font-size: 11pt; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</div>
        <div style="font-size: 10.5pt; font-style: italic;">Hà Nội, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}</div>
      </td>
    </tr>
  </table>

  <div class="title-doc">NGÂN HÀNG CÂU HỎI & ĐÁP ÁN ÔN TẬP MÔN CÔNG NGHỆ 10</div>
  <div class="subtitle-doc">
    Chương trình SGK Kết nối tri thức với cuộc sống (Bài 3, Bài 4, Bài 6)<br>
    <b>Giáo viên phụ trách: Cô Mai Hằng (GVMaiHang)</b> • Lưu trữ & Thống kê tự động trên Google Sheets ID: 16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY
  </div>

  <!-- PHẦN 1: BÀI 3 -->
  <div class="section-title">PHẦN 1: BÀI 3 - 10 CÔNG NGHỆ PHỔ BIẾN</div>
  <p><b>Phạm vi kiến thức:</b> Luyện kim (luyện kim đen, luyện kim màu); Đúc; Gia công cắt gọt; Gia công áp lực; Hàn; Sản xuất điện năng; Điện quang; Điện cơ; Điều khiển tự động hóa; Truyền thông không dây.</p>

  <div class="game-title">1.1. CÁC BỘ CÂU HỎI GHÉP ĐÔI HÌNH ẢNH / KHÁI NIỆM (MATCHING)</div>
  ${MATCHING_QUESTIONS.filter(q => q.lessonId === 'bai-3').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 10%;">STT</th>
            <th style="width: 30%;">Tên Công nghệ / Thuật ngữ</th>
            <th style="width: 60%;">Đặc điểm nhận diện / Ứng dụng chuẩn SGK</th>
          </tr>
        </thead>
        <tbody>
          ${q.pairs.map((p, idx) => `
            <tr>
              <td style="text-align: center;"><b>${idx + 1}</b></td>
              <td><b>${p.term}</b></td>
              <td>${p.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">1.2. CÁC BỘ CÂU HỎI KÉO THẢ TƯƠNG TÁC (DRAG & DROP)</div>
  ${DRAG_DROP_QUESTIONS.filter(q => q.lessonId === 'bai-3').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40%;">Ô đích (Khái niệm / Định nghĩa)</th>
            <th style="width: 60%;">Thẻ từ khóa ghép đúng</th>
          </tr>
        </thead>
        <tbody>
          ${q.slots.map(s => {
            const item = q.items.find(it => it.targetSlotId === s.id);
            return `
              <tr>
                <td><b>${s.label}:</b> <i>${s.description || ''}</i></td>
                <td style="color: #047857; font-weight: bold;">[ ${item?.text || '---'} ]</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">1.3. CÁC BỘ CÂU HỎI PHÂN LOẠI CÔNG NGHỆ (CLASSIFICATION)</div>
  ${CLASSIFICATION_QUESTIONS.filter(q => q.lessonId === 'bai-3').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 35%;">Đối tượng / Thiết bị / Phương pháp</th>
            <th style="width: 30%;">Nhóm phân loại đúng</th>
            <th style="width: 35%;">Giải thích chi tiết</th>
          </tr>
        </thead>
        <tbody>
          ${q.items.map(it => {
            const cat = q.categories.find(c => c.id === it.categoryId);
            return `
              <tr>
                <td><b>${it.text}</b></td>
                <td style="color: #0284c7; font-weight: bold;">${cat?.name}</td>
                <td>${it.detailHint || ''}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">1.4. CÁC BỘ CÂU HỎI SẮP XẾP TRÌNH TỰ (ORDERING)</div>
  ${ORDERING_QUESTIONS.filter(q => q.lessonId === 'bai-3').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 15%; text-align: center;">Thứ tự đúng</th>
            <th style="width: 50%;">Nội dung bước / Mốc phát triển</th>
            <th style="width: 35%;">Ghi chú kỹ thuật</th>
          </tr>
        </thead>
        <tbody>
          ${[...q.steps].sort((a, b) => a.correctIndex - b.correctIndex).map(s => `
            <tr>
              <td style="text-align: center; font-weight: bold; color: #7c2d12;">Bước ${s.correctIndex + 1}</td>
              <td><b>${s.text}</b></td>
              <td>${s.hint || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">1.5. CÂU HỎI NHÀ KĨ SƯ TƯƠNG LAI - XỬ LÝ TÌNH HUỐNG (FUTURE ENGINEER)</div>
  ${ENGINEER_QUESTIONS.filter(q => q.lessonId === 'bai-3').map((q, idx) => {
    const correctOpt = q.options.find(o => o.isCorrect);
    return `
    <div class="question-block">
      <div class="scenario-box">
        <span class="role-badge">Vai trò: ${q.role}</span>
        <div class="q-title">${idx + 1}. ${q.title}</div>
        <p style="margin: 6px 0;">${q.scenario}</p>
        <div>
          ${q.options.map(opt => `
            <div class="option-item ${opt.isCorrect ? 'correct' : ''}">
              <b>${opt.id}.</b> ${opt.text} ${opt.isCorrect ? '✔️ (ĐÁP ÁN ĐÚNG)' : ''}
            </div>
          `).join('')}
        </div>
        <div class="answer-key" style="margin-top: 10px;">
          <b>Đáp án đúng:</b> [ ${correctOpt?.id || ''} ] - ${correctOpt?.text || ''}<br>
          <b>Giải thích chuyên môn:</b> ${q.explanation}<br>
          <b>Ứng dụng thực tế:</b> ${q.realWorldImpact || ''}
        </div>
      </div>
    </div>
  `;}).join('')}

  <!-- PHẦN 2: BÀI 4 -->
  <div class="section-title">PHẦN 2: BÀI 4 - MỘT SỐ CÔNG NGHỆ MỚI</div>
  <p><b>Phạm vi kiến thức:</b> Công nghệ Nano (1-100 nm); CAD/CAM/CNC; Công nghệ in 3D; Năng lượng tái tạo; Trí tuệ nhân tạo (AI); Internet vạn vật (IoT); Robot thông minh.</p>

  <div class="game-title">2.1. CÁC BỘ CÂU HỎI GHÉP ĐÔI (MATCHING)</div>
  ${MATCHING_QUESTIONS.filter(q => q.lessonId === 'bai-4').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 10%;">STT</th>
            <th style="width: 30%;">Công nghệ mới</th>
            <th style="width: 60%;">Bản chất công nghệ & Ứng dụng nổi bật</th>
          </tr>
        </thead>
        <tbody>
          ${q.pairs.map((p, idx) => `
            <tr>
              <td style="text-align: center;"><b>${idx + 1}</b></td>
              <td><b>${p.term}</b></td>
              <td>${p.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">2.2. CÁC BỘ CÂU HỎI KÉO THẢ TƯƠNG TÁC (DRAG & DROP)</div>
  ${DRAG_DROP_QUESTIONS.filter(q => q.lessonId === 'bai-4').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40%;">Ô vị trí</th>
            <th style="width: 60%;">Thẻ nội dung đúng</th>
          </tr>
        </thead>
        <tbody>
          ${q.slots.map(s => {
            const item = q.items.find(it => it.targetSlotId === s.id);
            return `
              <tr>
                <td><b>${s.label}:</b> <i>${s.description || ''}</i></td>
                <td style="color: #047857; font-weight: bold;">[ ${item?.text || '---'} ]</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">2.3. CÁC BỘ CÂU HỎI PHÂN LOẠI CÔNG NGHỆ (CLASSIFICATION)</div>
  ${CLASSIFICATION_QUESTIONS.filter(q => q.lessonId === 'bai-4').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 35%;">Công nghệ / Ứng dụng thực tế</th>
            <th style="width: 30%;">Phân nhóm chuẩn xác</th>
            <th style="width: 35%;">Đặc trưng nhận diện</th>
          </tr>
        </thead>
        <tbody>
          ${q.items.map(it => {
            const cat = q.categories.find(c => c.id === it.categoryId);
            return `
              <tr>
                <td><b>${it.text}</b></td>
                <td style="color: #0284c7; font-weight: bold;">${cat?.name}</td>
                <td>${it.detailHint || ''}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">2.4. CÁC BỘ CÂU HỎI SẮP XẾP TRÌNH TỰ (ORDERING)</div>
  ${ORDERING_QUESTIONS.filter(q => q.lessonId === 'bai-4').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 15%; text-align: center;">Trình tự</th>
            <th style="width: 50%;">Nội dung quy trình CAD-CAM-CNC / In 3D</th>
            <th style="width: 35%;">Căn cứ kỹ thuật</th>
          </tr>
        </thead>
        <tbody>
          ${[...q.steps].sort((a, b) => a.correctIndex - b.correctIndex).map(s => `
            <tr>
              <td style="text-align: center; font-weight: bold; color: #7c2d12;">Bước ${s.correctIndex + 1}</td>
              <td><b>${s.text}</b></td>
              <td>${s.hint || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">2.5. CÂU HỎI NHÀ KĨ SƯ TƯƠNG LAI - XỬ LÝ TÌNH HUỐNG (FUTURE ENGINEER)</div>
  ${ENGINEER_QUESTIONS.filter(q => q.lessonId === 'bai-4').map((q, idx) => {
    const correctOpt = q.options.find(o => o.isCorrect);
    return `
    <div class="question-block">
      <div class="scenario-box">
        <span class="role-badge">Vai trò: ${q.role}</span>
        <div class="q-title">${idx + 1}. ${q.title}</div>
        <p style="margin: 6px 0;">${q.scenario}</p>
        <div>
          ${q.options.map(opt => `
            <div class="option-item ${opt.isCorrect ? 'correct' : ''}">
              <b>${opt.id}.</b> ${opt.text} ${opt.isCorrect ? '✔️ (ĐÁP ÁN ĐÚNG)' : ''}
            </div>
          `).join('')}
        </div>
        <div class="answer-key" style="margin-top: 10px;">
          <b>Đáp án đúng:</b> [ ${correctOpt?.id || ''} ] - ${correctOpt?.text || ''}<br>
          <b>Giải thích chuyên môn:</b> ${q.explanation}<br>
          <b>Ý nghĩa thực tiễn:</b> ${q.realWorldImpact || ''}
        </div>
      </div>
    </div>
  `;}).join('')}

  <!-- PHẦN 3: BÀI 6 -->
  <div class="section-title">PHẦN 3: BÀI 6 - CÁC CUỘC CÁCH MẠNG CÔNG NGHIỆP</div>
  <p><b>Phạm vi kiến thức:</b> CMCN 1.0 (Máy hơi nước, cơ giới hóa); CMCN 2.0 (Năng lượng điện, động cơ đốt trong, dây chuyền hàng loạt); CMCN 3.0 (Máy tính điện tử, vi mạch bán dẫn, Internet); CMCN 4.0 (Công nghệ số, AI, Big Data, Cloud, Nhà máy thông minh).</p>

  <div class="game-title">3.1. CÁC BỘ CÂU HỎI GHÉP ĐÔI (MATCHING)</div>
  ${MATCHING_QUESTIONS.filter(q => q.lessonId === 'bai-6').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 10%;">STT</th>
            <th style="width: 30%;">Phát minh / Mốc lịch sử</th>
            <th style="width: 60%;">Cuộc CMCN & Tác động to lớn</th>
          </tr>
        </thead>
        <tbody>
          ${q.pairs.map((p, idx) => `
            <tr>
              <td style="text-align: center;"><b>${idx + 1}</b></td>
              <td><b>${p.term}</b></td>
              <td>${p.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">3.2. CÁC BỘ CÂU HỎI KÉO THẢ TƯƠNG TÁC (DRAG & DROP)</div>
  ${DRAG_DROP_QUESTIONS.filter(q => q.lessonId === 'bai-6').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40%;">Cuộc CMCN / Bối cảnh</th>
            <th style="width: 60%;">Thành tựu cốt lõi</th>
          </tr>
        </thead>
        <tbody>
          ${q.slots.map(s => {
            const item = q.items.find(it => it.targetSlotId === s.id);
            return `
              <tr>
                <td><b>${s.label}:</b> <i>${s.description || ''}</i></td>
                <td style="color: #047857; font-weight: bold;">[ ${item?.text || '---'} ]</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">3.3. CÁC BỘ CÂU HỎI PHÂN LOẠI CÔNG NGHỆ (CLASSIFICATION)</div>
  ${CLASSIFICATION_QUESTIONS.filter(q => q.lessonId === 'bai-6').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40%;">Thành tựu / Phát minh</th>
            <th style="width: 30%;">Thuộc Cuộc CMCN</th>
            <th style="width: 30%;">Thời gian & Địa điểm</th>
          </tr>
        </thead>
        <tbody>
          ${q.items.map(it => {
            const cat = q.categories.find(c => c.id === it.categoryId);
            return `
              <tr>
                <td><b>${it.text}</b></td>
                <td style="color: #0284c7; font-weight: bold;">${cat?.name}</td>
                <td>${it.detailHint || ''}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">3.4. CÁC BỘ CÂU HỎI SẮP XẾP TRÌNH TỰ (ORDERING)</div>
  ${ORDERING_QUESTIONS.filter(q => q.lessonId === 'bai-6').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 15%; text-align: center;">Trình tự lịch sử</th>
            <th style="width: 50%;">Mốc thời gian & Phát minh then chốt</th>
            <th style="width: 35%;">Đặc trưng thời đại</th>
          </tr>
        </thead>
        <tbody>
          ${[...q.steps].sort((a, b) => a.correctIndex - b.correctIndex).map(s => `
            <tr>
              <td style="text-align: center; font-weight: bold; color: #7c2d12;">Bước ${s.correctIndex + 1}</td>
              <td><b>${s.text}</b></td>
              <td>${s.hint || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">3.5. CÂU HỎI NHÀ KĨ SƯ TƯƠNG LAI - XỬ LÝ TÌNH HUỐNG (FUTURE ENGINEER)</div>
  ${ENGINEER_QUESTIONS.filter(q => q.lessonId === 'bai-6').map((q, idx) => {
    const correctOpt = q.options.find(o => o.isCorrect);
    return `
    <div class="question-block">
      <div class="scenario-box">
        <span class="role-badge">Vai trò: ${q.role}</span>
        <div class="q-title">${idx + 1}. ${q.title}</div>
        <p style="margin: 6px 0;">${q.scenario}</p>
        <div>
          ${q.options.map(opt => `
            <div class="option-item ${opt.isCorrect ? 'correct' : ''}">
              <b>${opt.id}.</b> ${opt.text} ${opt.isCorrect ? '✔️ (ĐÁP ÁN ĐÚNG)' : ''}
            </div>
          `).join('')}
        </div>
        <div class="answer-key" style="margin-top: 10px;">
          <b>Đáp án đúng:</b> [ ${correctOpt?.id || ''} ] - ${correctOpt?.text || ''}<br>
          <b>Giải thích chuyên môn:</b> ${q.explanation}<br>
          <b>Ý nghĩa lịch sử & thực tiễn:</b> ${q.realWorldImpact || ''}
        </div>
      </div>
    </div>
  `;}).join('')}

  <!-- PHẦN 4: TỔNG HỢP -->
  <div class="section-title">PHẦN 4: ÔN TẬP TỔNG HỢP LIÊN BÀI (BÀI 3, BÀI 4 & BÀI 6)</div>
  <div class="game-title">4.1. BỘ CÂU HỎI GHÉP ĐÔI TỔNG HỢP</div>
  ${MATCHING_QUESTIONS.filter(q => q.lessonId === 'tong-hop').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 10%;">STT</th>
            <th style="width: 30%;">Thuật ngữ liên bài</th>
            <th style="width: 60%;">Nội dung kết nối chuẩn xác</th>
          </tr>
        </thead>
        <tbody>
          ${q.pairs.map((p, idx) => `
            <tr>
              <td style="text-align: center;"><b>${idx + 1}</b></td>
              <td><b>${p.term}</b></td>
              <td>${p.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">4.2. BỘ CÂU HỎI KÉO THẢ TỔNG HỢP</div>
  ${DRAG_DROP_QUESTIONS.filter(q => q.lessonId === 'tong-hop').map(q => `
    <div class="question-block">
      <div class="q-title">${q.title}</div>
      <div class="q-desc">${q.instruction}</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40%;">Ô đích</th>
            <th style="width: 60%;">Thẻ ghép đúng</th>
          </tr>
        </thead>
        <tbody>
          ${q.slots.map(s => {
            const item = q.items.find(it => it.targetSlotId === s.id);
            return `
              <tr>
                <td><b>${s.label}:</b> <i>${s.description || ''}</i></td>
                <td style="color: #047857; font-weight: bold;">[ ${item?.text || '---'} ]</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <div class="answer-key"><b>Căn cứ SGK:</b> ${q.explanation}</div>
    </div>
  `).join('')}

  <div class="game-title">4.3. CÂU HỎI KĨ SƯ TƯƠNG LAI TỔNG HỢP</div>
  ${ENGINEER_QUESTIONS.filter(q => q.lessonId === 'tong-hop').map((q, idx) => {
    const correctOpt = q.options.find(o => o.isCorrect);
    return `
    <div class="question-block">
      <div class="scenario-box">
        <span class="role-badge">Vai trò: ${q.role}</span>
        <div class="q-title">${idx + 1}. ${q.title}</div>
        <p style="margin: 6px 0;">${q.scenario}</p>
        <div>
          ${q.options.map(opt => `
            <div class="option-item ${opt.isCorrect ? 'correct' : ''}">
              <b>${opt.id}.</b> ${opt.text} ${opt.isCorrect ? '✔️ (ĐÁP ÁN ĐÚNG)' : ''}
            </div>
          `).join('')}
        </div>
        <div class="answer-key" style="margin-top: 10px;">
          <b>Đáp án đúng:</b> [ ${correctOpt?.id || ''} ] - ${correctOpt?.text || ''}<br>
          <b>Giải thích chuyên môn:</b> ${q.explanation}
        </div>
      </div>
    </div>
  `;}).join('')}

  <!-- Footer -->
  <div class="footer-note">
    Tài liệu lưu hành nội bộ phục vụ công tác giảng dạy & kiểm tra đánh giá môn Công nghệ 10.<br>
    Hệ thống kết nối trực tuyến: Google Apps Script Web App • Google Sheets ID: <b>16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY</b>
  </div>

</body>
</html>`;
}
