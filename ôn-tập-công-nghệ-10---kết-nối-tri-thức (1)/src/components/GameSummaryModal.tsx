import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Play, Home, Sparkles, FileSpreadsheet, Layers } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameSummaryModalProps {
  score: number; // 0 - 10
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  sessionId: string;
  isReviewMode: boolean;
  reviewedScore?: number;
  syncStatus?: {
    forwarded?: boolean;
    row?: number;
    message?: string;
  };
  wrongQuestionDetails: Array<{
    id: string;
    title: string;
    explanation: string;
  }>;
  onReviewWrongOnly: () => void;
  onReplayAll: () => void;
  onSwitchSet: () => void;
  onGoHome: () => void;
}

export const GameSummaryModal: React.FC<GameSummaryModalProps> = ({
  score,
  totalQuestions,
  correctCount,
  wrongCount,
  sessionId,
  isReviewMode,
  reviewedScore,
  syncStatus,
  wrongQuestionDetails,
  onReviewWrongOnly,
  onReplayAll,
  onSwitchSet,
  onGoHome,
}) => {
  useEffect(() => {
    if (score >= 8 || (reviewedScore && reviewedScore >= 8)) {
      soundManager.playWin();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [score, reviewedScore]);

  const displayScore = isReviewMode && reviewedScore !== undefined ? reviewedScore : score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-4">
        {/* Banner */}
        <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-6 sm:p-7 text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
            <Trophy className="w-9 h-9 text-yellow-300" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isReviewMode ? 'Hoàn Thành Ôn Lại Câu Sai!' : 'Hoàn Thành Lượt Chơi!'}
          </h2>

          <p className="text-xs sm:text-sm text-cyan-100 mt-1 font-medium">
            {displayScore >= 9
              ? 'Xuất sắc! Em nắm rất vững kiến thức Công nghệ 10.'
              : displayScore >= 7
              ? 'Rất tốt! Em đã hiểu sâu nội dung bài học.'
              : 'Đã hoàn thành! Hãy ôn lại các câu sai để cải thiện điểm số nhé.'}
          </p>

          {/* Big Score Badge */}
          <div className="mt-4 inline-flex items-baseline gap-1 bg-slate-950/40 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-2xl shadow-inner">
            <span className="text-3xl sm:text-4xl font-extrabold text-yellow-300 font-mono">
              {displayScore}
            </span>
            <span className="text-sm font-semibold text-slate-300">/ 10 điểm</span>
          </div>

          {isReviewMode && (
            <div className="mt-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 inline-block px-3 py-1 rounded-full border border-emerald-400/40">
              Đã cập nhật vào cột M–O trên dòng cũ của Google Sheets
            </div>
          )}
        </div>

        {/* Breakdown Stats */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Tổng câu</div>
              <div className="text-lg font-bold text-white font-mono">{totalQuestions}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
              <div className="text-[11px] font-bold text-emerald-400 uppercase">Đúng</div>
              <div className="text-lg font-bold text-emerald-300 font-mono flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{correctCount}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40">
              <div className="text-[11px] font-bold text-rose-400 uppercase">Cần ôn</div>
              <div className="text-lg font-bold text-rose-300 font-mono flex items-center justify-center gap-1">
                <XCircle className="w-4 h-4" />
                <span>{wrongCount}</span>
              </div>
            </div>
          </div>

          {/* Sync status card */}
          <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold text-white">Google Sheets KET_QUA_TRO_CHOI:</span>
                <div className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                  Mã: {sessionId}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold text-[10px]">
              Tự động ghi nhận
            </span>
          </div>

          {/* Wrong Questions Section */}
          {wrongQuestionDetails.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400 uppercase tracking-wider">
                <span>Danh sách câu cần củng cố ({wrongQuestionDetails.length}):</span>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1 border border-slate-800 rounded-xl p-2 bg-slate-950/50">
                {wrongQuestionDetails.map((wq, i) => (
                  <div key={wq.id || i} className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{wq.title}</span>
                    </div>
                    <div className="text-slate-300 pl-5 text-[11px] leading-relaxed">
                      <span className="text-yellow-400 font-medium">Ghi nhớ SGK: </span>
                      {wq.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {/* If wrong answers exist: Action to Review Wrong Only */}
            {wrongCount > 0 && (
              <button
                onClick={onReviewWrongOnly}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chỉ ôn lại {wrongCount} câu sai (Cập nhật cột M–O)</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onReplayAll}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chơi lại toàn bộ</span>
              </button>

              <button
                onClick={onSwitchSet}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Đổi bộ câu hỏi khác</span>
              </button>
            </div>

            <button
              onClick={onGoHome}
              className="w-full py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Về màn hình chọn bài học & trò chơi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
