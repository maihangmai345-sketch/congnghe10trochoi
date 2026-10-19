import React, { useState, useEffect } from 'react';
import { MatchingQuestionSet, MatchingPair } from '../../types/game';
import { soundManager } from '../../utils/audio';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Layers, Award, Lightbulb } from 'lucide-react';
import { shuffleArray } from '../../data/questions';

interface MatchingGameProps {
  questionSet: MatchingQuestionSet;
  filterWrongIds?: string[]; // When reviewing wrong questions only
  onComplete: (score: number, total: number, wrongIds: string[]) => void;
  onExit: () => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  questionSet,
  filterWrongIds,
  onComplete,
  onExit,
}) => {
  const [pairsToPlay, setPairsToPlay] = useState<MatchingPair[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<MatchingPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchingPair[]>([]);

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);

  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongAttemptIds, setWrongAttemptIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string; detail?: string } | null>(null);

  const [isFinished, setIsFinished] = useState(false);

  // Initialize pairs (either full set or filtered for wrong questions review)
  useEffect(() => {
    let base = [...questionSet.pairs];
    if (filterWrongIds && filterWrongIds.length > 0) {
      base = base.filter(p => filterWrongIds.includes(p.id));
      if (base.length === 0) base = [...questionSet.pairs];
    }
    setPairsToPlay(base);
    setShuffledLeft(shuffleArray(base));
    setShuffledRight(shuffleArray(base));
    setMatchedIds(new Set());
    setWrongAttemptIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setFeedback(null);
    setIsFinished(false);
  }, [questionSet, filterWrongIds]);

  // Check matching when both left and right are selected
  useEffect(() => {
    if (selectedLeftId && selectedRightId) {
      const isMatch = selectedLeftId === selectedRightId;
      const currentPair = pairsToPlay.find(p => p.id === selectedLeftId);

      if (isMatch) {
        soundManager.playCorrect();
        const newMatched = new Set(matchedIds);
        newMatched.add(selectedLeftId);
        setMatchedIds(newMatched);

        setFeedback({
          isCorrect: true,
          text: `Chính xác! Ghép thành công: "${currentPair?.term}"`,
          detail: currentPair?.description,
        });

        // Check completion
        if (newMatched.size >= pairsToPlay.length) {
          setIsFinished(true);
          const total = pairsToPlay.length;
          const wrongCount = wrongAttemptIds.size;
          const score = Math.max(0, Math.round(((total - wrongCount) / total) * 10));
          setTimeout(() => {
            onComplete(score, total, Array.from(wrongAttemptIds));
          }, 1200);
        }
      } else {
        soundManager.playWrong();
        const newWrongs = new Set(wrongAttemptIds);
        newWrongs.add(selectedLeftId);
        setWrongAttemptIds(newWrongs);

        const targetCorrect = pairsToPlay.find(p => p.id === selectedLeftId);
        setFeedback({
          isCorrect: false,
          text: 'Chưa chính xác! Hãy thử lại.',
          detail: `Gợi ý SGK: "${targetCorrect?.term}" tương ứng với: ${targetCorrect?.description}`,
        });
      }

      const timer = setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [selectedLeftId, selectedRightId]);

  const progress = pairsToPlay.length > 0 ? (matchedIds.size / pairsToPlay.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Game Header */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Ghép đôi hình ảnh & khái niệm
              </span>
              {filterWrongIds && filterWrongIds.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Chế độ ôn lại câu sai
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {questionSet.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Nhấp chọn 1 thẻ thuật ngữ bên trái và 1 thẻ mô tả/ứng dụng bên phải để tạo thành cặp đúng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Tiến độ ghép</div>
              <div className="text-sm sm:text-base font-bold text-cyan-700 font-mono">
                {matchedIds.size} / {pairsToPlay.length} cặp
              </div>
            </div>
            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Thoát
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sky-100 rounded-full h-2 mt-4 overflow-hidden border border-sky-200">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 sm:p-4 rounded-xl border transition-all animate-in fade-in slide-in-from-top-2 flex items-start gap-3 shadow-xs ${
            feedback.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          {feedback.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5 text-xs sm:text-sm">
            <div className="font-bold">{feedback.text}</div>
            {feedback.detail && (
              <div className="text-slate-600 text-xs leading-relaxed">
                {feedback.detail}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Terms */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-800 flex items-center gap-1.5 px-1">
            <span>Cột A: Thuật ngữ / Khái niệm</span>
          </h3>
          <div className="space-y-2.5">
            {shuffledLeft.map((pair) => {
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedLeftId === pair.id;

              return (
                <button
                  key={`left-${pair.id}`}
                  disabled={isMatched}
                  onClick={() => setSelectedLeftId(pair.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl text-left border transition-all relative cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-70 cursor-default'
                      : isSelected
                      ? 'bg-cyan-50 border-cyan-500 text-cyan-900 shadow-md ring-2 ring-cyan-400/50 scale-[1.01]'
                      : 'bg-white hover:bg-sky-50/70 border-sky-200 text-slate-800 hover:border-cyan-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm sm:text-base">
                      {pair.term}
                    </span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Descriptions */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5 px-1">
            <span>Cột B: Đặc điểm / Bản chất kỹ thuật</span>
          </h3>
          <div className="space-y-2.5">
            {shuffledRight.map((pair) => {
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedRightId === pair.id;

              return (
                <button
                  key={`right-${pair.id}`}
                  disabled={isMatched}
                  onClick={() => setSelectedRightId(pair.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl text-left border transition-all relative cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-70 cursor-default'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-md ring-2 ring-blue-400/50 scale-[1.01]'
                      : 'bg-white hover:bg-sky-50/70 border-sky-200 text-slate-700 hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm leading-relaxed font-medium">
                      {pair.description}
                    </span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SGK Reference Footer */}
      <div className="p-3 bg-white border border-sky-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-xs">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Ghi chú chuẩn SGK: </span>
          {questionSet.explanation}
        </div>
      </div>
    </div>
  );
};
