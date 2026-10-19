import React, { useState } from 'react';
import { Student } from '../data/students';
import { LessonId, GameModeId } from '../types/game';
import { LESSONS_META, GAME_MODES_META } from '../data/questions';
import {
  Sparkles,
  Layers,
  Move,
  FolderTree,
  ArrowDownUp,
  Wrench,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Zap,
  Gamepad2,
  Smile,
  Star,
  Check
} from 'lucide-react';

interface HomeHubProps {
  currentStudent: Student | null;
  onOpenStudentModal: () => void;
  onStartGame: (lessonId: LessonId, gameMode: GameModeId, setIndex: number) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  currentStudent,
  onOpenStudentModal,
  onStartGame,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<LessonId>('bai-3');
  const [selectedGameMode, setSelectedGameMode] = useState<GameModeId>('matching');
  const [selectedSetIndex, setSelectedSetIndex] = useState<number>(1);
  const [showSummaryNotes, setShowSummaryNotes] = useState(false);

  const getGameIcon = (modeId: GameModeId) => {
    switch (modeId) {
      case 'matching':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'drag-drop':
        return <Move className="w-5 h-5 text-emerald-600" />;
      case 'classification':
        return <FolderTree className="w-5 h-5 text-amber-600" />;
      case 'ordering':
        return <ArrowDownUp className="w-5 h-5 text-purple-600" />;
      case 'engineer':
        return <Wrench className="w-5 h-5 text-rose-600" />;
    }
  };

  const getGameEmoji = (modeId: GameModeId) => {
    switch (modeId) {
      case 'matching': return '🧩';
      case 'drag-drop': return '🖐️';
      case 'classification': return '📂';
      case 'ordering': return '⏱️';
      case 'engineer': return '🚀';
    }
  };

  const getLessonEmoji = (lessonId: LessonId) => {
    switch (lessonId) {
      case 'bai-3': return '⚙️';
      case 'bai-4': return '🤖';
      case 'bai-6': return '🏭';
      case 'tong-hop': return '🎯';
    }
  };

  const handleLaunch = () => {
    if (!currentStudent) {
      onOpenStudentModal();
      return;
    }
    onStartGame(selectedLesson, selectedGameMode, selectedSetIndex);
  };

  const currentLessonMeta = LESSONS_META.find(l => l.id === selectedLesson);
  const currentGameMeta = GAME_MODES_META.find(g => g.id === selectedGameMode);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Cheerful Lively Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 border border-sky-300/40 p-5 sm:p-8 overflow-hidden shadow-xl shadow-blue-500/20 text-white">
        {/* Soft decorative background circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-12 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                Ôn tập Công nghệ 10 • Kết nối tri thức với cuộc sống
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 shadow-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                Chơi vui • Nhớ lâu • Điểm cao
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight flex items-center gap-2">
              <span>Đấu Trường Công Nghệ 10</span>
              <span className="text-2xl sm:text-3xl animate-bounce">🎮</span>
            </h1>

            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed font-medium">
              Chào mừng các bạn học sinh! Trò chơi tương tác đa dạng bám sát SGK:{' '}
              <span className="text-yellow-200 font-bold bg-black/10 px-1.5 py-0.5 rounded">Bài 3 (10 công nghệ)</span>,{' '}
              <span className="text-yellow-200 font-bold bg-black/10 px-1.5 py-0.5 rounded">Bài 4 (7 công nghệ mới)</span> và{' '}
              <span className="text-yellow-200 font-bold bg-black/10 px-1.5 py-0.5 rounded">Bài 6 (4 cuộc CMCN)</span>.
            </p>
          </div>

          {/* Cheerful Student Status Card */}
          <div className="w-full md:w-auto shrink-0">
            {currentStudent ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg text-slate-800 space-y-2.5 min-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/30">
                    {currentStudent.id}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-sky-600 uppercase tracking-wide flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-amber-500" />
                      Chào bạn:
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900">
                      {currentStudent.name}
                    </div>
                    <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      Lớp {currentStudent.className}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenStudentModal}
                  className="w-full py-1.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition border border-sky-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Đổi học sinh khác</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenStudentModal}
                className="w-full md:w-auto px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition cursor-pointer transform hover:scale-105 active:scale-95"
              >
                <Smile className="w-5 h-5 text-slate-900" />
                <span>Đăng nhập Mã & Lớp để bắt đầu!</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STEP 1: CHỌN BÀI HỌC */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-sky-500/20">
              1
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Chọn Bài Học Cần Ôn Tập</span>
              <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Chuẩn SGK
              </span>
            </h2>
          </div>

          <button
            onClick={() => setShowSummaryNotes(!showSummaryNotes)}
            className="text-xs text-sky-700 hover:text-sky-900 flex items-center gap-1.5 font-bold transition cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-sky-200 shadow-2xs hover:shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>{showSummaryNotes ? 'Ẩn tóm tắt SGK' : '📖 Xem tóm tắt nhanh SGK'}</span>
          </button>
        </div>

        {/* Quick Summary Collapsible Drawer */}
        {showSummaryNotes && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-sky-200 space-y-3 text-xs sm:text-sm text-slate-700 shadow-sm animate-in fade-in">
            <h3 className="font-extrabold text-sky-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              Tóm tắt trọng tâm chuẩn SGK Kết nối tri thức:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <span>⚙️</span>
                  <span>Bài 3: 10 Công nghệ phổ biến</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  • <b>Cơ khí & Luyện kim:</b> Luyện kim (gang, thép, kim loại màu); Đúc (rót lỏng vào khuôn); Cắt gọt (tiện, phay, bào, mài); Gia công áp lực (cán, kéo, rèn, dập); Hàn (nối vĩnh cửu nung chảy/áp lực).<br />
                  • <b>Điện - Điện tử:</b> Sản xuất điện năng; Điện - quang (đèn sợi đốt 1879, huỳnh quang 1934, LED 2006); Điện - cơ; Điều khiển tự động hóa; Truyền thông không dây.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 space-y-1">
                <div className="font-bold text-sky-900 flex items-center gap-1.5">
                  <span>🤖</span>
                  <span>Bài 4: 7 Công nghệ mới</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  • <b>Công nghệ Nano:</b> Vật liệu 1-100 nm.<br />
                  • <b>CAD/CAM/CNC:</b> CAD thiết kế 3D → CAM lập quy trình → CNC gia công máy số.<br />
                  • <b>In 3D:</b> Đắp từng lớp 2D liên tiếp theo tuần tự.<br />
                  • <b>Năng lượng tái tạo:</b> Mặt trời, gió, địa nhiệt, thủy điện.<br />
                  • <b>AI, IoT, Robot thông minh:</b> Trí tuệ máy tính, kết nối vạn vật, robot tự hành.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 space-y-1">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <span>🏭</span>
                  <span>Bài 6: 4 Cuộc CMCN</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  • <b>CMCN 1.0 (Cuối TK XVIII - Anh):</b> Hơi nước & cơ giới hóa (Watt 1784).<br />
                  • <b>CMCN 2.0 (Cuối TK XIX):</b> Điện năng & sản xuất hàng loạt (Edison, Ford).<br />
                  • <b>CMCN 3.0 (Những năm 70 TK XX):</b> CNTT & tự động hóa (Máy tính, Internet).<br />
                  • <b>CMCN 4.0 (Từ 2011 - Đức):</b> Công nghệ số, AI, Big Data, Smart Factory.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cheerful Lesson Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LESSONS_META.map(lesson => {
            const isSelected = selectedLesson === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-sky-50 to-blue-50/80 border-sky-500 shadow-lg shadow-sky-500/15 ring-2 ring-sky-400/30 scale-[1.01]'
                    : 'bg-white border-sky-200/90 hover:border-sky-400 hover:bg-sky-50/50 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xl">
                    {getLessonEmoji(lesson.id)}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {lesson.badge}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition line-clamp-1">
                  {lesson.title}
                </div>
                <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                  {lesson.subtitle}
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-sky-200/60 flex items-center justify-between text-xs font-bold text-sky-700">
                    <span>Đang chọn bài này</span>
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2: CHỌN TRÒ CHƠI TƯƠNG TÁC */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-sky-500/20">
            2
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Chọn Dạng Trò Chơi Tương Tác</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              5 trò chơi thú vị
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {GAME_MODES_META.map(game => {
            const isSelected = selectedGameMode === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGameMode(game.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-gradient-to-b from-sky-50 to-blue-50/80 border-sky-500 shadow-lg shadow-sky-500/15 ring-2 ring-sky-400/30 scale-[1.01]'
                    : 'bg-white border-sky-200/90 hover:border-sky-400 hover:bg-sky-50/50 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-lg">
                      {getGameEmoji(game.id)}
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                    {game.name}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 leading-snug font-medium line-clamp-2">
                    {game.description}
                  </div>
                </div>

                <div className="mt-3 text-[10px] font-bold text-sky-700 uppercase tracking-wide">
                  {game.english}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 3: CHỌN BỘ CÂU HỎI (Bộ 1 vs Bộ 2) */}
      <section className="bg-white border-2 border-sky-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-800 mb-1">
            <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-black">3</span>
            <span>Bộ câu hỏi ôn luyện ({selectedLesson.toUpperCase()})</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            Mỗi trò chơi có ít nhất 2 bộ câu hỏi khác nhau để đảo câu hỏi, tránh nhàm chán:
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setSelectedSetIndex(1)}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedSetIndex === 1
                ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30'
                : 'bg-sky-50/80 text-sky-900 border-sky-200 hover:bg-sky-100'
            }`}
          >
            <span>🌟</span>
            <span>Bộ Câu Hỏi 1</span>
          </button>
          <button
            onClick={() => setSelectedSetIndex(2)}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedSetIndex === 2
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                : 'bg-indigo-50/80 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <span>🚀</span>
            <span>Bộ Câu Hỏi 2</span>
          </button>
        </div>
      </section>

      {/* Cheerful Big Action Launch Button */}
      <div className="pt-2 text-center">
        <button
          onClick={handleLaunch}
          className="w-full sm:w-auto min-w-[320px] py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-base sm:text-lg shadow-xl shadow-blue-500/25 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2.5 mx-auto transform hover:scale-[1.02]"
        >
          <Gamepad2 className="w-6 h-6 text-yellow-300 animate-spin-slow" />
          <span>BẮT ĐẦU TRÒ CHƠI ÔN TẬP NGAY</span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </button>

        <p className="text-xs text-slate-600 mt-2.5 font-bold">
          🎯 Đang chọn: <span className="text-sky-700 underline">{currentLessonMeta?.title}</span> •{' '}
          <span className="text-indigo-700 underline">{currentGameMeta?.name}</span> •{' '}
          <span className="text-amber-700 underline">Bộ câu hỏi {selectedSetIndex}</span>
        </p>
      </div>
    </div>
  );
};
