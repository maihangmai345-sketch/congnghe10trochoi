import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { ZipArchive } from 'archiver';
import { GoogleGenAI } from '@google/genai';
import { APPS_SCRIPT_SOURCE_CODE, GOOGLE_SHEET_ID } from './src/data/appsScriptCode';
import { generateQuestionBankWordHtml, getAllQuestionsStructured } from './src/utils/questionBankExport';

dotenv.config();

const app = express();
// Runtime Environment requires dev server on port 3000
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory / file-backed persistent store for game results
interface StoredResult {
  sessionId: string;
  timestamp: string;
  studentId: number;
  studentName: string;
  className: string;
  lessonId: string;
  lessonTitle: string;
  gameMode: string;
  gameModeTitle: string;
  setIndex: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  wrongQuestionIds?: string[];
  reviewedScore?: number;
  reviewedCorrectCount?: number;
  reviewedTimestamp?: string;
  status: 'HOAN_THANH' | 'DA_ON_TAP';
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const RESULTS_FILE = path.join(DATA_DIR, 'results.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readStoredResults(): StoredResult[] {
  try {
    if (fs.existsSync(RESULTS_FILE)) {
      const data = fs.readFileSync(RESULTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading results file:', err);
  }
  return [];
}

function writeStoredResults(results: StoredResult[]) {
  try {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing results file:', err);
  }
}

interface AppConfig {
  appsScriptUrl: string;
  sheetId: string;
}

function readConfig(): AppConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading config file:', err);
  }
  return {
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbxCQDHbX_Iq8A11yKhekUIibCS1DHiygOZZhrtZNvlv2CXkVSGggcsF9IsUh2AiJ-NQ/exec',
    sheetId: GOOGLE_SHEET_ID,
  };
}

function writeConfig(config: AppConfig) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing config file:', err);
  }
}

// Forward data to Google Apps Script Web App if configured
async function forwardToAppsScript(payload: any) {
  const config = readConfig();
  if (!config.appsScriptUrl || !config.appsScriptUrl.startsWith('http')) {
    return { forwarded: false, reason: 'Apps Script URL not set yet' };
  }

  try {
    const res = await fetch(config.appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
    return { forwarded: true, response: json };
  } catch (err: any) {
    console.warn('Apps Script forward error:', err.message);
    return { forwarded: false, error: err.message };
  }
}

// Teacher active sessions
const validTeacherTokens = new Set<string>();

// -------------------------------------------------------------
// TEACHER AUTH (Server-side only, no keys in client code)
// -------------------------------------------------------------
app.post('/api/teacher/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'GVMaiHang' && password === '123456Hang') {
    const token = 'token-' + Math.random().toString(36).substring(2) + '-' + Date.now();
    validTeacherTokens.add(token);
    return res.json({
      success: true,
      token,
      teacher: {
        username: 'GVMaiHang',
        displayName: 'Cô Mai Hằng (Giáo viên Công nghệ 10)',
      },
    });
  }
  return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
});

app.post('/api/teacher/verify', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && validTeacherTokens.has(token)) {
    return res.json({ success: true, teacherName: 'Cô Mai Hằng' });
  }
  return res.status(401).json({ success: false });
});

app.post('/api/teacher/logout', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) validTeacherTokens.delete(token);
  return res.json({ success: true });
});

// -------------------------------------------------------------
// SCORES & GOOGLE SHEETS APPS SCRIPT SYNC
// -------------------------------------------------------------
// 1. Lưu lượt chơi chính một dòng từ hàng 4
app.post('/api/scores/save', async (req: Request, res: Response) => {
  try {
    const record: StoredResult = {
      ...req.body,
      status: 'HOAN_THANH',
      timestamp: req.body.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    };

    const results = readStoredResults();
    // Check if duplicate session
    const existingIndex = results.findIndex((r) => r.sessionId === record.sessionId);
    if (existingIndex >= 0) {
      results[existingIndex] = record;
    } else {
      results.push(record);
    }
    writeStoredResults(results);

    // Forward to Google Apps Script
    const appsScriptResult = await forwardToAppsScript({
      action: 'SAVE_INITIAL_SCORE',
      ...record,
    });

    return res.json({
      success: true,
      sessionId: record.sessionId,
      appsScriptSync: appsScriptResult,
      totalSaved: results.length,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Ôn lại câu sai: Chỉ cập nhật cột M–O của dòng cũ bằng cách dò Mã lượt chơi
app.post('/api/scores/update-review', async (req: Request, res: Response) => {
  try {
    const { sessionId, reviewedScore, reviewedCorrectCount } = req.body;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Thiếu mã lượt chơi (sessionId)' });
    }

    const results = readStoredResults();
    const target = results.find((r) => r.sessionId === sessionId);

    const reviewedTimestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    if (target) {
      target.reviewedScore = reviewedScore;
      target.reviewedCorrectCount = reviewedCorrectCount;
      target.reviewedTimestamp = reviewedTimestamp;
      target.status = 'DA_ON_TAP';
      writeStoredResults(results);
    }

    // Forward update to Google Apps Script
    const appsScriptResult = await forwardToAppsScript({
      action: 'UPDATE_REVIEW_SCORE',
      sessionId,
      reviewedScore,
      reviewedCorrectCount,
      reviewedTimestamp,
    });

    return res.json({
      success: true,
      sessionId,
      reviewedScore,
      reviewedCorrectCount,
      reviewedTimestamp,
      appsScriptSync: appsScriptResult,
      message: 'Đã cập nhật kết quả ôn tập cột M-O thành công!',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Lấy danh sách kết quả (phục vụ dashboard giáo viên và thống kê)
app.get('/api/scores', (_req: Request, res: Response) => {
  const results = readStoredResults();
  return res.json({
    success: true,
    count: results.length,
    data: results,
  });
});

// Cấu hình URL Apps Script & Google Sheet ID
app.get('/api/teacher/config', (_req: Request, res: Response) => {
  const config = readConfig();
  return res.json({ success: true, config });
});

app.post('/api/teacher/config', (req: Request, res: Response) => {
  const { appsScriptUrl, sheetId } = req.body;
  const current = readConfig();
  const updated: AppConfig = {
    appsScriptUrl: appsScriptUrl !== undefined ? appsScriptUrl : current.appsScriptUrl,
    sheetId: sheetId || current.sheetId || GOOGLE_SHEET_ID,
  };
  writeConfig(updated);
  return res.json({ success: true, config: updated });
});

// Kiểm tra kết nối tới Google Apps Script Web App
app.post('/api/teacher/test-connection', async (req: Request, res: Response) => {
  try {
    const { appsScriptUrl } = req.body;
    const targetUrl = appsScriptUrl || readConfig().appsScriptUrl;
    if (!targetUrl || !targetUrl.startsWith('http')) {
      return res.json({ success: false, message: 'URL Google Apps Script không hợp lệ!' });
    }

    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.json({
      success: true,
      status: response.status,
      message: 'Kết nối thành công tới Web App!',
      details: data,
    });
  } catch (err: any) {
    return res.json({
      success: false,
      message: 'Lỗi kết nối Web App: ' + err.message,
    });
  }
});

// Tải về mã code Apps Script (.gs)
app.get('/api/teacher/download-apps-script', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="Code.gs"');
  return res.send(APPS_SCRIPT_SOURCE_CODE);
});

// Tải về trang web HTML hoàn chỉnh (Offline Standalone Bundle / HTML Page)
app.get('/api/teacher/download-html', (_req: Request, res: Response) => {
  try {
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    let content = fs.readFileSync(htmlPath, 'utf-8');
    
    // Add meta documentation for teachers
    content = content.replace(
      '</head>',
      `<!-- 
Bản xuất HTML - Hệ thống Ôn tập Công nghệ 10
Giáo viên: Mai Hằng
Google Sheets ID: ${GOOGLE_SHEET_ID}
Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}
-->\n</head>`
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="OnTapCongNghe10.html"');
    return res.send(content);
  } catch (err: any) {
    return res.status(500).send('Lỗi xuất file HTML: ' + err.message);
  }
});

// Tải về file Word / HTML Ngân hàng Toàn bộ Câu hỏi & Đáp án cho Giáo viên
app.get('/api/teacher/download-questions-doc', (_req: Request, res: Response) => {
  try {
    const docHtml = generateQuestionBankWordHtml();
    res.setHeader('Content-Type', 'application/msword; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="Ngan_Hang_Cau_Hoi_Cong_Nghe_10_GVMaiHang.doc"');
    return res.send(docHtml);
  } catch (err: any) {
    return res.status(500).send('Lỗi xuất file câu hỏi: ' + err.message);
  }
});

// Tải về dữ liệu câu hỏi dạng JSON
app.get('/api/teacher/download-questions-json', (_req: Request, res: Response) => {
  try {
    const data = getAllQuestionsStructured();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="Ngan_Hang_Cau_Hoi_Cong_Nghe_10.json"');
    return res.send(JSON.stringify(data, null, 2));
  } catch (err: any) {
    return res.status(500).send('Lỗi xuất file câu hỏi JSON: ' + err.message);
  }
});

// Lấy danh sách câu hỏi cho giao diện GV xem trước
app.get('/api/teacher/questions', (_req: Request, res: Response) => {
  try {
    const data = getAllQuestionsStructured();
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Tải trọn bộ mã nguồn GitHub & Cloudflare Pages (ZIP) cho Giáo viên
app.get('/api/teacher/download-repo-zip', (_req: Request, res: Response) => {
  try {
    const archive = new ZipArchive({
      zlib: { level: 9 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="OnTapCongNghe10_GitHub_Cloudflare.zip"');

    archive.on('error', (err: any) => {
      console.error('Archive error:', err);
      if (!res.headersSent) {
        res.status(500).send('Lỗi đóng gói mã nguồn: ' + err.message);
      }
    });

    archive.pipe(res);

    const rootDir = process.cwd();

    // 1. Thư mục mã nguồn và tài nguyên
    if (fs.existsSync(path.join(rootDir, 'src'))) {
      archive.directory(path.join(rootDir, 'src'), 'src');
    }
    if (fs.existsSync(path.join(rootDir, 'public'))) {
      archive.directory(path.join(rootDir, 'public'), 'public');
    }
    if (fs.existsSync(path.join(rootDir, 'functions'))) {
      archive.directory(path.join(rootDir, 'functions'), 'functions');
    }

    // 2. Các tệp cấu hình cốt lõi
    const essentialFiles = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'index.html',
      'README.md',
      'wrangler.toml',
      '.gitignore',
      '.env.example',
      'deploy-to-github.bat',
      'deploy-to-github.sh',
      'server.ts',
    ];

    for (const f of essentialFiles) {
      const fullPath = path.join(rootDir, f);
      if (fs.existsSync(fullPath)) {
        archive.file(fullPath, { name: f });
      }
    }

    // 3. Thêm file Code.gs vào thư mục gốc của zip để giáo viên tiện dùng ngay
    archive.append(APPS_SCRIPT_SOURCE_CODE, { name: 'Code.gs' });

    archive.finalize();
  } catch (err: any) {
    console.error('Failed to create repo zip:', err);
    res.status(500).send('Lỗi khi nén mã nguồn: ' + err.message);
  }
});

// -------------------------------------------------------------
// GEMINI API SERVER-SIDE INTEGRATION (Bảo mật bằng GEMINI_API_KEY)
// -------------------------------------------------------------
// 1. Trợ lý Kỹ sư AI phân tích tình huống thực tế
app.post('/api/gemini/engineer-hint', async (req: Request, res: Response) => {
  try {
    const { role, scenario, options, userChoiceId } = req.body;

    const prompt = `Bạn là Trưởng ban Cố vấn Kỹ thuật kiêm Giảng viên Công nghệ 10 bộ sách "Kết nối tri thức với cuộc sống".
Học sinh đang đóng vai: "${role || 'Kỹ sư công nghệ'}"
Bối cảnh tình huống thực tế: "${scenario}"
Các phương án lựa chọn: ${JSON.stringify(options)}
${userChoiceId ? `Học sinh đang cân nhắc phương án: "${userChoiceId}"` : 'Học sinh đang xin lời khuyên phân tích.'}

Hãy viết một phản hồi ngắn gọn (dưới 150 từ), súc tích, mang tinh thần động viên và phân tích khoa học chuẩn xác theo SGK Công nghệ 10.
Chỉ ra nguyên lý kỹ thuật then chốt giúp học sinh tự tin đưa ra giải pháp đúng mà không làm mất tính tư duy của học sinh.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      hint: response.text || 'Hãy xem xét kỹ bản chất của phương pháp chế tạo và yêu cầu kỹ thuật của bài toán!',
    });
  } catch (error: any) {
    console.error('Gemini hint error:', error);
    return res.json({
      success: false,
      hint: 'Hãy căn cứ vào bản chất kỹ thuật trong SGK: Đúc rót kim loại lỏng, Cắt gọt tạo phoi, Áp lực dựa tính dẻo, và Hàn nung chảy liên kết!',
    });
  }
});

// 2. Trợ lý AI giải thích câu hỏi khó
app.post('/api/gemini/explain-question', async (req: Request, res: Response) => {
  try {
    const { questionTitle, explanation, userChoice } = req.body;

    const prompt = `Bạn là giáo viên chuyên môn Công nghệ 10 (Sách Kết nối tri thức).
Nội dung câu hỏi: "${questionTitle}"
Kiến thức chuẩn SGK: "${explanation}"
${userChoice ? `Lựa chọn của học sinh: "${userChoice}"` : ''}

Hãy giải thích thật dễ hiểu, sinh động, liên hệ 1 ví dụ thực tế trong đời sống hoặc công nghiệp để học sinh ghi nhớ sâu sắc. Độ dài khoảng 3-4 câu.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      explanation: response.text,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      explanation: 'Theo SGK Công nghệ 10, hãy ghi nhớ mốc thời gian, bản chất vật lý và ứng dụng thực tiễn của từng công nghệ!',
    });
  }
});

// 3. Phân tích sư phạm cho Giáo viên
app.post('/api/gemini/teacher-insights', async (req: Request, res: Response) => {
  try {
    const { records } = req.body;

    const summaryData = (records || []).slice(-30).map((r: any) => ({
      class: r.className,
      lesson: r.lessonTitle,
      game: r.gameModeTitle,
      score: r.score,
      total: r.totalQuestions,
      reviewed: r.reviewedScore !== undefined,
    }));

    const prompt = `Bạn là chuyên gia khảo thí và sư phạm môn Công nghệ 10.
Dưới đây là tóm tắt các lượt chơi ôn tập gần đây của học sinh lớp 10C05 và 10C06:
${JSON.stringify(summaryData)}

Hãy đưa ra nhận định sư phạm ngắn gọn (khoảng 3 gạch đầu dòng):
1. Đánh giá mức độ nắm vững bài học của học sinh (Bài 3, 4, 6).
2. Dạng trò chơi hoặc chủ đề mà học sinh cần củng cố thêm.
3. Một lời khuyên thực tế để giáo viên tổ chức tiết dạy ôn tập hiệu quả trên lớp.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      insights: response.text,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      insights: 'Học sinh tham gia tích cực. Nên tăng cường ôn tập về các bước CAD/CAM/CNC và mốc thời gian các cuộc CMCN.',
    });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER OR STATIC ASSETS
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
