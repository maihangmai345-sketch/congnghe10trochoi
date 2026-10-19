import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { APPS_SCRIPT_SOURCE_CODE, GOOGLE_SHEET_ID, DEFAULT_APPS_SCRIPT_URL } from '../data/appsScriptCode';
import {
  MATCHING_QUESTIONS,
  DRAG_DROP_QUESTIONS,
  CLASSIFICATION_QUESTIONS,
  ORDERING_QUESTIONS,
  ENGINEER_QUESTIONS,
  LESSONS_META,
  GAME_MODES_META
} from '../data/questions';
import {
  GraduationCap,
  LogOut,
  FileSpreadsheet,
  Code,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  Bot,
  ExternalLink,
  RefreshCw,
  Sliders,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  AlertCircle,
  BookOpen,
  FileDown,
  Layers,
  Move,
  FolderTree,
  ArrowDownUp,
  Wrench,
  CheckSquare,
  Github,
  Cloud,
  Globe,
  Terminal,
  Rocket,
  FolderArchive
} from 'lucide-react';

interface TeacherPortalProps {
  onLogout: () => void;
  onClose: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<'scores' | 'questions' | 'github-cloudflare' | 'appscript' | 'config' | 'download' | 'ai'>('scores');
  const [copiedGit, setCopiedGit] = useState(false);

  const handleCopyGit = () => {
    const cmd = `# 1. Khởi tạo Git và thêm toàn bộ tệp\ngit init\ngit add .\ngit commit -m "feat: On tap Cong nghe 10 - Co Mai Hang"\ngit branch -M main\n\n# 2. Đẩy lên GitHub (thay bằng link GitHub của bạn)\ngit remote add origin <LINK_REPO_GITHUB_CUA_CO>\ngit push -u origin main`;
    navigator.clipboard.writeText(cmd);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2500);
  };

  // Scores data
  const [scores, setScores] = useState<any[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [searchName, setSearchName] = useState<string>('');

  // Questions explorer filter state
  const [qLessonFilter, setQLessonFilter] = useState<string>('ALL');
  const [qTypeFilter, setQTypeFilter] = useState<string>('ALL');
  const [qSearchTerm, setQSearchTerm] = useState<string>('');

  // Apps script code copy state
  const [copiedCode, setCopiedCode] = useState(false);

  // Config state
  const [appsScriptUrl, setAppsScriptUrl] = useState(DEFAULT_APPS_SCRIPT_URL);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSaveMsg, setConfigSaveMsg] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  // AI Insights
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    fetchScores();
    fetchConfig();
  }, []);

  const fetchScores = async () => {
    setIsLoadingScores(true);
    const res = await api.getScores();
    if (res.success && Array.isArray(res.data)) {
      setScores(res.data.reverse()); // most recent first
    }
    setIsLoadingScores(false);
  };

  const fetchConfig = async () => {
    const res = await api.getTeacherConfig();
    if (res.success && res.config) {
      setAppsScriptUrl(res.config.appsScriptUrl || DEFAULT_APPS_SCRIPT_URL);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSaveMsg('');
    const res = await api.saveTeacherConfig({ appsScriptUrl, sheetId: GOOGLE_SHEET_ID });
    if (res.success) {
      setConfigSaveMsg('Đã lưu cấu hình Apps Script thành công!');
    } else {
      setConfigSaveMsg('Lỗi khi lưu cấu hình.');
    }
    setIsSavingConfig(false);
  };

  const handleTestConnection = async () => {
    if (!appsScriptUrl) {
      setTestResult({ success: false, message: 'Vui lòng nhập URL Web App trước khi kiểm tra!' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await api.testAppsScriptConnection(appsScriptUrl);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Lỗi kết nối Web App: ' + err.message + '. Hãy chắc chắn bạn đã phân quyền "Bất kỳ ai" (Anyone) khi triển khai.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_SOURCE_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateAiInsights = async () => {
    setIsLoadingAi(true);
    try {
      const res = await api.getGeminiTeacherInsights(scores);
      if (res && res.insights) {
        setAiInsights(res.insights);
      }
    } catch {
      setAiInsights('Không thể tải phân tích AI vào lúc này.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const filteredScores = scores.filter(s => {
    if (filterClass !== 'ALL' && s.className !== filterClass) return false;
    if (searchName.trim()) {
      const term = searchName.toLowerCase().trim();
      return (
        s.studentName?.toLowerCase().includes(term) ||
        s.sessionId?.toLowerCase().includes(term) ||
        s.studentId?.toString() === term
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = [
      'Thời gian',
      'Mã lượt chơi',
      'Mã HS',
      'Họ và tên',
      'Lớp',
      'Bài học',
      'Trò chơi',
      'Bộ câu hỏi',
      'Điểm lần đầu',
      'Tổng câu',
      'Số câu đúng',
      'Số câu sai',
      'Điểm sau ôn lại (Cột M)',
      'Đúng sau ôn lại (Cột N)',
      'Thời gian ôn lại (Cột O)',
      'Trạng thái',
    ];

    const rows = filteredScores.map(s => [
      `"${s.timestamp || ''}"`,
      `"${s.sessionId || ''}"`,
      s.studentId || '',
      `"${s.studentName || ''}"`,
      `"${s.className || ''}"`,
      `"${s.lessonTitle || ''}"`,
      `"${s.gameModeTitle || ''}"`,
      `"Bộ ${s.setIndex || 1}"`,
      s.score ?? '',
      s.totalQuestions ?? '',
      s.correctCount ?? '',
      s.wrongCount ?? '',
      s.reviewedScore ?? '',
      s.reviewedCorrectCount ?? '',
      `"${s.reviewedTimestamp || ''}"`,
      `"${s.status === 'DA_ON_TAP' ? 'Đã ôn lại câu sai' : 'Hoàn thành'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bang_Diem_Cong_Nghe_10_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered questions count
  const allMatching = MATCHING_QUESTIONS.filter(q => qLessonFilter === 'ALL' || q.lessonId === qLessonFilter);
  const allDragDrop = DRAG_DROP_QUESTIONS.filter(q => qLessonFilter === 'ALL' || q.lessonId === qLessonFilter);
  const allClassification = CLASSIFICATION_QUESTIONS.filter(q => qLessonFilter === 'ALL' || q.lessonId === qLessonFilter);
  const allOrdering = ORDERING_QUESTIONS.filter(q => qLessonFilter === 'ALL' || q.lessonId === qLessonFilter);
  const allEngineer = ENGINEER_QUESTIONS.filter(q => qLessonFilter === 'ALL' || q.lessonId === qLessonFilter);

  return (
    <div className="space-y-6 pb-16">
      {/* Teacher Header Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 border border-sky-400/40 rounded-3xl p-5 sm:p-7 shadow-xl shadow-blue-500/20 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-7 h-7 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Cổng Giáo Viên: Cô Mai Hằng
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900 shadow-xs">
                GVMaiHang
              </span>
            </div>
            <p className="text-xs sm:text-sm text-sky-100 mt-0.5 font-medium">
              Quản lý ôn tập Công nghệ 10 • Đồng bộ Google Sheets ID:{' '}
              <span className="font-mono text-yellow-200 font-bold">{GOOGLE_SHEET_ID}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onClose}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition border border-white/30 cursor-pointer"
          >
            Về giao diện học sinh
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sky-200/80 pb-3">
        <button
          onClick={() => setActiveTab('scores')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'scores'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
          <span>Bảng Điểm Học Sinh ({scores.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>Ngân Hàng Câu Hỏi & Tải Về</span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900">
            Tải file
          </span>
        </button>

        <button
          onClick={() => setActiveTab('github-cloudflare')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'github-cloudflare'
              ? 'bg-gradient-to-r from-slate-900 via-sky-900 to-indigo-950 text-white shadow-md ring-2 ring-sky-400'
              : 'bg-white text-slate-800 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Github className="w-4 h-4 text-emerald-500" />
          <span>Mã Nguồn GitHub & Cloudflare</span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
            ZIP Web
          </span>
        </button>

        <button
          onClick={() => setActiveTab('appscript')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'appscript'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Code className="w-4 h-4 text-purple-500" />
          <span>Mã Code Apps Script (Code.gs)</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'config'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-500" />
          <span>Cấu Hình Kết Nối Sheets</span>
        </button>

        <button
          onClick={() => setActiveTab('download')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'download'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Download className="w-4 h-4 text-indigo-500" />
          <span>Tải Về HTML & Tài Liệu</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-sky-200'
          }`}
        >
          <Bot className="w-4 h-4 text-rose-500" />
          <span>Trợ Lý Sư Phạm AI (Gemini)</span>
        </button>
      </div>

      {/* TAB: NGÂN HÀNG CÂU HỎI CHO GIÁO VIÊN (YÊU CẦU MỚI) */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Prominent Download Banner for Teachers */}
          <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-2 border-sky-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-200 text-sky-800 border border-sky-300 inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                  Tài liệu chuyên môn dành riêng cho Giáo viên
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Tải Về Toàn Bộ Ngân Hàng Câu Hỏi & Đáp Án Công Nghệ 10
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Bao gồm đầy đủ các câu hỏi bám sát SGK Kết nối tri thức: <b>Bài 3</b> (10 công nghệ), <b>Bài 4</b> (7 công nghệ mới), <b>Bài 6</b> (4 cuộc CMCN) và <b>Tổng hợp</b> của cả 5 dạng trò chơi (Ghép đôi, Kéo thả, Phân loại, Sắp xếp, Xử lý tình huống Kỹ sư) kèm bảng đáp án chi tiết và giải thích chuẩn kiến thức.
                </p>
              </div>

              {/* Main Download Button */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href="/api/teacher/download-questions-doc"
                  download="Ngan_Hang_Cau_Hoi_Cong_Nghe_10_GVMaiHang.doc"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 transition cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  <FileDown className="w-5 h-5 text-yellow-300" />
                  <span>TẢI FILE WORD (.DOC) CHO GV</span>
                </a>

                <a
                  href="/api/teacher/download-questions-json"
                  download="Ngan_Hang_Cau_Hoi_Cong_Nghe_10.json"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-800 font-extrabold text-sm flex items-center justify-center gap-2 border-2 border-sky-300 shadow-sm transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-sky-600" />
                  <span>Tải Dữ Liệu JSON</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs text-center">
                <div className="text-2xl font-black text-sky-700">4</div>
                <div className="text-xs font-bold text-slate-600">Chủ đề bài học</div>
                <div className="text-[10px] text-slate-400">Bài 3, 4, 6 & Tổng hợp</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs text-center">
                <div className="text-2xl font-black text-emerald-600">5</div>
                <div className="text-xs font-bold text-slate-600">Dạng trò chơi</div>
                <div className="text-[10px] text-slate-400">Đa dạng hình thức ôn</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs text-center">
                <div className="text-2xl font-black text-indigo-600">10+</div>
                <div className="text-xs font-bold text-slate-600">Bộ đề độc lập</div>
                <div className="text-[10px] text-slate-400">Đảo câu hỏi phong phú</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs text-center">
                <div className="text-2xl font-black text-amber-500">100%</div>
                <div className="text-xs font-bold text-slate-600">Có Đáp Án & Giải Thích</div>
                <div className="text-[10px] text-slate-400">Chuẩn SGK KNTT</div>
              </div>
            </div>
          </div>

          {/* Interactive Question Browser */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Search className="w-5 h-5 text-sky-600" />
                  <span>Tra Cứu & Xem Trước Câu Hỏi Trực Tuyến</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Xem ngay từng câu hỏi, đáp án đúng và lời giải thích trước khi tải về file.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={qLessonFilter}
                  onChange={(e) => setQLessonFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 border border-sky-200 text-sky-900 focus:outline-none"
                >
                  <option value="ALL">Tất cả bài học</option>
                  <option value="bai-3">Bài 3: 10 Công nghệ phổ biến</option>
                  <option value="bai-4">Bài 4: 7 Công nghệ mới</option>
                  <option value="bai-6">Bài 6: 4 Cuộc CMCN</option>
                  <option value="tong-hop">Ôn tập tổng hợp</option>
                </select>

                <select
                  value={qTypeFilter}
                  onChange={(e) => setQTypeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 border border-sky-200 text-sky-900 focus:outline-none"
                >
                  <option value="ALL">Tất cả dạng trò chơi</option>
                  <option value="matching">Ghép đôi hình ảnh</option>
                  <option value="drag-drop">Kéo thả định nghĩa</option>
                  <option value="classification">Phân loại công nghệ</option>
                  <option value="ordering">Sắp xếp trình tự</option>
                  <option value="engineer">Kĩ sư tương lai</option>
                </select>

                <input
                  type="text"
                  placeholder="Tìm từ khóa..."
                  value={qSearchTerm}
                  onChange={(e) => setQSearchTerm(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-sky-50 border border-sky-200 text-slate-800 placeholder-slate-400 focus:outline-none w-36 sm:w-48"
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {/* Matching questions */}
              {(qTypeFilter === 'ALL' || qTypeFilter === 'matching') && allMatching.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-800 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-sky-600" />
                      {q.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Ghép đôi ({q.pairs.length} cặp)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {q.pairs.map((p, pIdx) => (
                      <div key={p.id} className="p-2.5 rounded-xl bg-white border border-sky-100 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                          {pIdx + 1}
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-800">{p.term}</div>
                          <div className="text-slate-600 text-[11px] mt-0.5">{p.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Drag drop questions */}
              {(qTypeFilter === 'ALL' || qTypeFilter === 'drag-drop') && allDragDrop.map(q => (
                <div key={q.id} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                      <Move className="w-4 h-4 text-emerald-600" />
                      {q.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Kéo thả ({q.slots.length} vị trí)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {q.slots.map(s => {
                      const matchedItem = q.items.find(it => it.targetSlotId === s.id);
                      return (
                        <div key={s.id} className="p-2.5 rounded-xl bg-white border border-emerald-100">
                          <div className="font-bold text-slate-800">{s.label}:</div>
                          <div className="text-[11px] text-slate-600">{s.description}</div>
                          <div className="mt-1 text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded inline-block">
                            ✓ Ghép đúng: {matchedItem?.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[11px] text-emerald-900 bg-white p-2 rounded-xl border border-emerald-100 font-medium">
                    <b>Căn cứ SGK:</b> {q.explanation}
                  </div>
                </div>
              ))}

              {/* Classification questions */}
              {(qTypeFilter === 'ALL' || qTypeFilter === 'classification') && allClassification.map(q => (
                <div key={q.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <FolderTree className="w-4 h-4 text-amber-600" />
                      {q.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Phân loại ({q.items.length} đối tượng)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {q.items.map(it => {
                      const cat = q.categories.find(c => c.id === it.categoryId);
                      return (
                        <div key={it.id} className="p-2 rounded-xl bg-white border border-amber-100">
                          <div className="font-bold text-slate-800">{it.text}</div>
                          <div className="text-amber-700 font-bold text-[11px] mt-0.5">
                            ➔ Nhóm: {cat?.name}
                          </div>
                          {it.detailHint && <div className="text-[10px] text-slate-500 mt-0.5">{it.detailHint}</div>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[11px] text-amber-900 bg-white p-2 rounded-xl border border-amber-100 font-medium">
                    <b>Căn cứ SGK:</b> {q.explanation}
                  </div>
                </div>
              ))}

              {/* Ordering questions */}
              {(qTypeFilter === 'ALL' || qTypeFilter === 'ordering') && allOrdering.map(q => (
                <div key={q.id} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                      <ArrowDownUp className="w-4 h-4 text-purple-600" />
                      {q.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Sắp xếp ({q.steps.length} bước)
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {[...q.steps].sort((a, b) => a.correctIndex - b.correctIndex).map(s => (
                      <div key={s.id} className="p-2 rounded-xl bg-white border border-purple-100 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                          {s.correctIndex + 1}
                        </span>
                        <div className="flex-1 font-bold text-slate-800">{s.text}</div>
                        {s.hint && <span className="text-[10px] text-slate-500">{s.hint}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-purple-900 bg-white p-2 rounded-xl border border-purple-100 font-medium">
                    <b>Căn cứ SGK:</b> {q.explanation}
                  </div>
                </div>
              ))}

              {/* Engineer Scenario questions */}
              {(qTypeFilter === 'ALL' || qTypeFilter === 'engineer') && allEngineer.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-rose-600" />
                      {idx + 1}. {q.title} (Vai trò: {q.role})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Tình huống Kỹ sư
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-rose-100">
                    {q.scenario}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map(opt => (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border ${
                          opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <b>{opt.id}.</b> {opt.text}
                        {opt.isCorrect && <span className="ml-1 text-emerald-600 font-black">✓ (Đúng)</span>}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-rose-900 bg-white p-2 rounded-xl border border-rose-100 font-medium">
                    <b>Giải thích chuyên môn:</b> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: BẢNG ĐIỂM HỌC SINH */}
      {activeTab === 'scores' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white border border-sky-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-sky-600" /> Lọc Lớp:
              </span>
              {(['ALL', '10C05', '10C06'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setFilterClass(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    filterClass === c
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-sky-50 text-slate-700 border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {c === 'ALL' ? 'Tất cả lớp' : `Lớp ${c}`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm học sinh, mã lượt..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-sky-50/70 border border-sky-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                onClick={fetchScores}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 transition"
                title="Làm mới bảng điểm"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingScores ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-sky-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-sky-50 border-b border-sky-200 text-slate-700 font-bold">
                    <th className="py-3 px-3">Thời gian</th>
                    <th className="py-3 px-3">Mã lượt chơi</th>
                    <th className="py-3 px-3">Học sinh</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3">Bài & Trò chơi</th>
                    <th className="py-3 px-3 text-center">Điểm đầu</th>
                    <th className="py-3 px-3 text-center">Đúng / Tổng</th>
                    <th className="py-3 px-3 text-center bg-emerald-50 text-emerald-800 font-bold border-l border-emerald-100">
                      Điểm ôn lại (Cột M)
                    </th>
                    <th className="py-3 px-3 text-center bg-emerald-50 text-emerald-800 font-bold">
                      Đúng ôn lại (Cột N)
                    </th>
                    <th className="py-3 px-3 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {filteredScores.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        {isLoadingScores ? 'Đang tải danh sách kết quả...' : 'Chưa có lượt thi nào được ghi nhận.'}
                      </td>
                    </tr>
                  ) : (
                    filteredScores.map((row, idx) => (
                      <tr key={idx} className="hover:bg-sky-50/50 transition">
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {row.timestamp}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-sky-700 whitespace-nowrap">
                          {row.sessionId}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {row.studentName}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800">
                            {row.className}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{row.lessonTitle}</div>
                          <div className="text-[10px] text-slate-500">{row.gameModeTitle} (Bộ {row.setIndex || 1})</div>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900">
                          <span className={`px-2 py-1 rounded-lg ${
                            row.score >= 8 ? 'bg-emerald-100 text-emerald-800' :
                            row.score >= 5 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {row.score}/10
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-600 font-medium">
                          {row.correctCount}/{row.totalQuestions}
                        </td>
                        <td className="py-3 px-3 text-center bg-emerald-50/50 border-l border-emerald-100">
                          {row.reviewedScore !== undefined ? (
                            <span className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                              {row.reviewedScore}/10
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center bg-emerald-50/50">
                          {row.reviewedCorrectCount !== undefined ? (
                            <span className="font-bold text-emerald-700">
                              {row.reviewedCorrectCount}/{row.totalQuestions}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {row.status === 'DA_ON_TAP' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Đã ôn câu sai
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                              Lần đầu
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MÃ NGUỒN GITHUB & TRIỂN KHAI CLOUDFLARE PAGES */}
      {activeTab === 'github-cloudflare' && (
        <div className="space-y-6 max-w-5xl">
          {/* Hero Banner: Tải Về Trọn Bộ Mã Nguồn */}
          <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 border-2 border-sky-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
                    <Rocket className="w-3.5 h-3.5" />
                    Sẵn sàng triển khai 100%
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-sky-200 border border-white/20">
                    Vite + React 19 + Tailwind CSS
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Cloudflare Pages & Edge Functions
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Tải Về Trọn Bộ Mã Nguồn Đưa Lên GitHub & Cloudflare Pages
                </h2>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                  Toàn bộ mã nguồn trang web ôn tập Công nghệ 10 của Cô Mai Hằng đã được chuẩn hóa để đưa lên GitHub và chạy trên Cloudflare Pages. Đầy đủ tệp điều hướng SPA (<code className="text-amber-300 font-mono">_redirects</code>), bảo mật (<code className="text-amber-300 font-mono">_headers</code>), Cloudflare Edge Functions (<code className="text-amber-300 font-mono">functions/api/</code>), cấu hình <code className="text-amber-300 font-mono">wrangler.toml</code>, tài liệu hướng dẫn <code className="text-amber-300 font-mono">README.md</code> cùng file chạy nhanh <code className="text-amber-300 font-mono">deploy-to-github.bat</code> cho máy tính.
                </p>
              </div>

              {/* Direct Download Button */}
              <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0 relative z-10">
                <a
                  href="/api/teacher/download-repo-zip"
                  download="OnTapCongNghe10_GitHub_Cloudflare.zip"
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition transform hover:scale-105 active:scale-95 cursor-pointer text-center"
                >
                  <FolderArchive className="w-6 h-6 text-slate-950" />
                  <span>TẢI FILE MÃ NGUỒN (ZIP) CHO GITHUB & CLOUDFLARE</span>
                </a>
                <div className="text-center text-[11px] text-sky-200/80 font-medium">
                  📦 Định dạng: Tệp nén .ZIP (~1.5 MB) • Tải về mở dùng ngay
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 relative z-10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Đã Tối Ưu Cho GitHub</div>
                  <div className="text-sky-200/70 text-[11px]">Có sẵn file .gitignore, deploy script tự động và tài liệu chuẩn.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Cloudflare Pages Ready</div>
                  <div className="text-sky-200/70 text-[11px]">Đầy đủ _redirects, _headers, wrangler.toml và Edge API.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-white">Bảo Toàn Điểm & Ôn Câu Sai</div>
                  <div className="text-sky-200/70 text-[11px]">Đồng bộ Google Sheet 16bPIYS... Cột M-O hoặc lưu trữ dự phòng.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed 3-Step Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 1 & 2: GitHub Guide */}
            <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Bước 1 & 2: Đẩy Code Lên GitHub</h3>
                  <p className="text-xs text-slate-500">Miễn phí, an toàn và lưu trữ mã nguồn vĩnh viễn</p>
                </div>
              </div>

              <ol className="text-xs text-slate-700 space-y-2.5 list-decimal list-inside leading-relaxed font-medium">
                <li>
                  Nhấp nút <b>"TẢI FILE MÃ NGUỒN (ZIP)"</b> ở trên và giải nén tệp <code className="text-sky-700 font-mono font-bold">OnTapCongNghe10_GitHub_Cloudflare.zip</code>.
                </li>
                <li>
                  Vào <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline font-bold inline-flex items-center gap-1">github.com <ExternalLink className="w-3 h-3 inline" /></a>, đăng nhập và nhấn <b>New Repository</b> (đặt tên ví dụ: <code className="font-bold text-slate-900">on-tap-cong-nghe-10</code>).
                </li>
                <li>
                  Mở Terminal (Command Prompt) tại thư mục vừa giải nén và chạy các lệnh dưới đây (hoặc nhấp đúp file <code className="text-emerald-700 font-bold font-mono">deploy-to-github.bat</code> trên Windows):
                </li>
              </ol>

              {/* Code snippet with copy button */}
              <div className="relative">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 text-slate-300 rounded-t-xl text-[11px] font-mono">
                  <span>Terminal / Command Prompt</span>
                  <button
                    onClick={handleCopyGit}
                    className="flex items-center gap-1 text-sky-300 hover:text-white transition font-bold cursor-pointer"
                  >
                    {copiedGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedGit ? 'Đã sao chép!' : 'Sao chép lệnh'}</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-950 text-emerald-400 font-mono text-xs rounded-b-xl overflow-x-auto leading-relaxed border border-slate-800">
{`git init
git add .
git commit -m "feat: On tap Cong nghe 10 - Co Mai Hang"
git branch -M main
git remote add origin https://github.com/TENTAIKHOAN/on-tap-cong-nghe-10.git
git push -u origin main`}
                </pre>
              </div>
            </div>

            {/* Step 3: Cloudflare Pages Deployment */}
            <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center font-black">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Bước 3: Triển Khai Trên Cloudflare Pages</h3>
                  <p className="text-xs text-slate-500">Tốc độ siêu nhanh tại Việt Nam, miễn phí 100%</p>
                </div>
              </div>

              <ol className="text-xs text-slate-700 space-y-2.5 list-decimal list-inside leading-relaxed font-medium">
                <li>
                  Vào <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-amber-600 hover:underline font-bold inline-flex items-center gap-1">dash.cloudflare.com <ExternalLink className="w-3 h-3 inline" /></a> {'->'} menu <b>Compute (Workers & Pages)</b> {'->'} chọn <b>Pages</b>.
                </li>
                <li>
                  Nhấp <b>Connect to Git</b> và chọn repository GitHub <code className="font-bold text-slate-900">on-tap-cong-nghe-10</code> vừa tạo.
                </li>
                <li>
                  Điền các thông số Build Settings chính xác như sau:
                </li>
              </ol>

              {/* Build Settings Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-amber-100">
                  <span className="text-slate-600 font-medium">Framework preset:</span>
                  <span className="font-mono font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">Vite (hoặc None)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-100">
                  <span className="text-slate-600 font-medium">Build command:</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">npm run build</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-100">
                  <span className="text-slate-600 font-medium">Build output directory:</span>
                  <span className="font-mono font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">dist</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-medium">Environment variable (Tùy chọn):</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">NODE_VERSION = 20</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-bold">
                  <Globe className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Sau khi nhấn "Save and Deploy", trang web sẽ chạy online ngay tại link: https://ten-du-an.pages.dev!</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Structure Breakdown Card */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-sky-600" />
              <span>Cấu Trúc Tệp Tin Trong Gói Tải Về (ZIP)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                <div className="font-mono font-bold text-sky-900">public/_redirects</div>
                <div className="text-slate-600 text-[11px]">Chỉ dẫn Cloudflare Pages định tuyến SPA không bị lỗi 404 khi tải lại trang.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                <div className="font-mono font-bold text-sky-900">functions/api/</div>
                <div className="text-slate-600 text-[11px]">Serverless Edge Functions xử lý API lưu điểm, đăng nhập và kiểm tra kết nối.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                <div className="font-mono font-bold text-sky-900">wrangler.toml</div>
                <div className="text-slate-600 text-[11px]">File cấu hình tiêu chuẩn cho dự án Cloudflare Pages / Workers.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                <div className="font-mono font-bold text-sky-900">README.md & Scripts</div>
                <div className="text-slate-600 text-[11px]">Tài liệu hướng dẫn tiếng Việt chi tiết kèm script tự động đẩy code lên GitHub.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MÃ CODE APPS SCRIPT */}
      {activeTab === 'appscript' && (
        <div className="space-y-4">
          <div className="bg-white border border-sky-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  <span>Mã Nguồn Google Apps Script (Code.gs)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mã nguồn chính thức kết nối Google Sheet ID: <span className="font-mono text-sky-700 font-bold">{GOOGLE_SHEET_ID}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Đã sao chép!' : 'Sao chép mã'}</span>
                </button>

                <a
                  href="/api/teacher/download-apps-script"
                  download="Code.gs"
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải tệp Code.gs</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed border border-slate-800">
                {APPS_SCRIPT_SOURCE_CODE}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CẤU HÌNH KẾT NỐI SHEETS */}
      {activeTab === 'config' && (
        <div className="space-y-4 max-w-3xl">
          <div className="bg-white border border-sky-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-sky-600" />
              <span>Cấu Hình Đồng Bộ Google Sheets</span>
            </h2>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mã Bảng Tính Google Sheet (Spreadsheet ID)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={GOOGLE_SHEET_ID}
                    disabled
                    className="w-full px-3 py-2 bg-sky-50 border border-sky-200 rounded-xl text-xs font-mono text-slate-700 font-bold"
                  />
                  <a
                    href={`https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition"
                    title="Mở Google Sheet"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  URL Ứng Dụng Web Apps Script (Web App URL)
                </label>
                <input
                  type="url"
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3 py-2.5 bg-sky-50 border border-sky-200 rounded-xl text-xs font-mono text-slate-900 font-semibold focus:outline-none focus:border-sky-500 transition"
                />
                <p className="text-[11px] text-slate-500">
                  Dán URL Web App sau khi triển khai Apps Script. Hệ thống sẽ tự động chuyển tiếp điểm số và ôn lại câu sai vào Google Sheet.
                </p>
              </div>

              {configSaveMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{configSaveMsg}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                >
                  {isSavingConfig ? 'Đang lưu...' : 'Lưu URL Cấu Hình'}
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-slate-700 border border-sky-200 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 text-sky-600" />}
                  <span>Kiểm tra kết nối</span>
                </button>
              </div>
            </form>

            {testResult && (
              <div className={`p-4 rounded-xl border text-xs space-y-1 animate-in fade-in ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                  : 'bg-rose-50 border-rose-300 text-rose-900 font-medium'
              }`}>
                <div className="font-bold flex items-center gap-2">
                  {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  <span>{testResult.message}</span>
                </div>
                {testResult.details && (
                  <pre className="font-mono text-[11px] bg-white p-2.5 rounded-lg mt-1 overflow-x-auto text-slate-700 border border-sky-100">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: TẢI VỀ TÀI LIỆU & TỆP HTML */}
      {activeTab === 'download' && (
        <div className="space-y-5 max-w-4xl">
          {/* Card 0: Full Source Code for GitHub & Cloudflare Pages */}
          <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 border-2 border-emerald-400/50 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl text-white relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white">
                      Trọn Bộ Mã Nguồn Website Đưa Lên GitHub & Cloudflare Pages (ZIP)
                    </h2>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                      Mới cập nhật
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed">
                    Toàn bộ code đã được chuẩn hóa để đưa lên GitHub và triển khai trên Cloudflare Pages (chạy online 24/7, miễn phí 100%, bảo mật SSL, kèm file cấu hình SPA và Edge API).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-sky-200">Tên tệp nén:</span>
                <span className="font-mono text-emerald-300 font-bold">OnTapCongNghe10_GitHub_Cloudflare.zip</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-sky-200">Bao gồm:</span>
                <span className="text-white font-medium">Toàn bộ React Vite SPA, functions/, public/_redirects, wrangler.toml, deploy script</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="/api/teacher/download-repo-zip"
                  download="OnTapCongNghe10_GitHub_Cloudflare.zip"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  <FolderArchive className="w-4 h-4 text-slate-950" />
                  <span>TẢI TOÀN BỘ CODE (ZIP) GITHUB & CLOUDFLARE</span>
                </a>

                <button
                  onClick={() => setActiveTab('github-cloudflare')}
                  className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>Xem hướng dẫn triển khai</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 1: Question Bank Download */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Ngân Hàng Câu Hỏi & Bài Tập Ôn Tập Công Nghệ 10 (Cho Giáo Viên)
                  </h2>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-900">
                    Khuyên dùng
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tải về toàn bộ các câu hỏi Bài 3, Bài 4, Bài 6 và Ôn tập tổng hợp dưới dạng tài liệu Word (.doc) hoặc tệp dữ liệu JSON. Sẵn sàng in ấn, ra đề kiểm tra 15 phút, 1 tiết hoặc thi học kỳ.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tên file Word:</span>
                <span className="font-mono text-sky-800 font-bold">Ngan_Hang_Cau_Hoi_Cong_Nghe_10_GVMaiHang.doc</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Nội dung bao gồm:</span>
                <span className="text-slate-800 font-bold">10+ bộ câu hỏi 5 trò chơi, đáp án & giải thích SGK</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="/api/teacher/download-questions-doc"
                  download="Ngan_Hang_Cau_Hoi_Cong_Nghe_10_GVMaiHang.doc"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-yellow-300" />
                  <span>TẢI VỀ FILE WORD (.DOC)</span>
                </a>

                <a
                  href="/api/teacher/download-questions-json"
                  download="Ngan_Hang_Cau_Hoi_Cong_Nghe_10.json"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border-2 border-sky-300 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4 text-sky-600" />
                  <span>TẢI DỮ LIỆU JSON</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: HTML Page Download */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Tải Về Tệp HTML Của Trang Web Ôn Tập (Offline)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cô Mai Hằng có thể tải về file HTML để lưu trữ, nhúng vào bài giảng điện tử hoặc chia sẻ cho học sinh.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tên tệp xuất bản:</span>
                <span className="font-mono text-sky-800 font-bold">OnTapCongNghe10.html</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tương thích:</span>
                <span className="text-emerald-700 font-bold">Mọi trình duyệt điện thoại và máy tính</span>
              </div>

              <div className="pt-2">
                <a
                  href="/api/teacher/download-html"
                  download="OnTapCongNghe10.html"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>TẢI VỀ TỆP HTML (ON TAP CONG NGHE 10)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TRỢ LÝ SƯ PHẠM AI (GEMINI) */}
      {activeTab === 'ai' && (
        <div className="space-y-4 max-w-3xl">
          <div className="bg-white border border-sky-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-rose-500" />
                  <span>Trợ Lý Sư Phạm AI (Gemini 3.8 Flash)</span>
                </h2>
                <p className="text-xs text-slate-600">
                  Tự động phân tích kết quả học tập của 2 lớp 10C05 và 10C06, phát hiện phần kiến thức học sinh hay sai và gợi ý hoạt động củng cố.
                </p>
              </div>

              <button
                onClick={handleGenerateAiInsights}
                disabled={isLoadingAi}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                {isLoadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-yellow-300" />}
                <span>Phân tích bằng AI</span>
              </button>
            </div>

            {aiInsights ? (
              <div className="p-4 sm:p-5 rounded-xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2 animate-in fade-in">
                <div className="font-bold text-sky-900 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Báo Cáo Phân Tích Sư Phạm:</span>
                </div>
                <div>{aiInsights}</div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-sky-200 rounded-xl space-y-2">
                <Bot className="w-8 h-8 text-slate-400 mx-auto" />
                <p>Nhấp vào nút "Phân tích bằng AI" để nhận khuyến nghị sư phạm chuyên sâu từ dữ liệu học sinh hiện tại.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
