import React, { useState, useEffect } from 'react';
import { ClassificationQuestionSet, ClassificationItem } from '../../types/game';
import { soundManager } from '../../utils/audio';
import { FolderTree, CheckCircle2, XCircle, Lightbulb, ArrowRight, HelpCircle } from 'lucide-react';
import { shuffleArray } from '../../data/questions';

interface ClassificationGameProps {
  questionSet: ClassificationQuestionSet;
  filterWrongIds?: string[];
  onComplete: (score: number, total: number, wrongIds: string[]) => void;
  onExit: () => void;
}

export const ClassificationGame: React.FC<ClassificationGameProps> = ({
  questionSet,
  filterWrongIds,
  onComplete,
  onExit,
}) => {
  const [items, setItems] = useState<ClassificationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongItems, setWrongItems] = useState<string[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string; hint?: string } | null>(null);

  useEffect(() => {
    let base = [...questionSet.items];
    if (filterWrongIds && filterWrongIds.length > 0) {
      base = base.filter(it => filterWrongIds.includes(it.id));
      if (base.length === 0) base = [...questionSet.items];
    }
    setItems(shuffleArray(base));
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongItems([]);
    setLastFeedback(null);
  }, [questionSet, filterWrongIds]);

  const currentItem = items[currentIndex];

  const handleClassify = (chosenCategoryId: string) => {
    if (!currentItem || lastFeedback) return;

    const isCorrect = currentItem.categoryId === chosenCategoryId;
    const targetCategory = questionSet.categories.find(c => c.id === currentItem.categoryId);

    if (isCorrect) {
      soundManager.playCorrect();
      setCorrectCount(prev => prev + 1);
      setLastFeedback({
        isCorrect: true,
        text: `Chính xác! "${currentItem.text}" thuộc nhóm "${targetCategory?.name}".`,
        hint: currentItem.detailHint,
      });
    } else {
      soundManager.playWrong();
      setWrongItems(prev => [...prev, currentItem.id]);
      setLastFeedback({
        isCorrect: false,
        text: `Chưa đúng! "${currentItem.text}" thuộc nhóm "${targetCategory?.name}".`,
        hint: currentItem.detailHint,
      });
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      setLastFeedback(null);

      if (nextIndex < items.length) {
        setCurrentIndex(nextIndex);
      } else {
        // Complete
        const total = items.length;
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        const finalWrongs = isCorrect ? wrongItems : [...wrongItems, currentItem.id];
        const score = Math.round((finalCorrect / total) * 10);
        onComplete(score, total, finalWrongs);
      }
    }, 1500);
  };

  const progress = items.length > 0 ? (currentIndex / items.length) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-fit">
              <FolderTree className="w-3.5 h-3.5" />
              Phân loại công nghệ
            </span>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {questionSet.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {questionSet.instruction}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Câu hỏi</div>
              <div className="text-sm sm:text-base font-bold text-amber-700 font-mono">
                {currentIndex + 1} / {items.length}
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

        {/* Progress bar */}
        <div className="w-full bg-sky-100 rounded-full h-2 mt-4 overflow-hidden border border-sky-200">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Flashcard to Classify */}
      {currentItem && (
        <div className="bg-white border border-sky-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            Khái niệm / Thiết bị số {currentIndex + 1}
          </div>

          <div className="text-lg sm:text-2xl font-black text-slate-800 max-w-xl mx-auto leading-snug">
            {currentItem.text}
          </div>

          {currentItem.detailHint && (
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
              Đặc điểm: {currentItem.detailHint}
            </p>
          )}

          {/* Feedback Overlay */}
          {lastFeedback && (
            <div
              className={`p-3.5 rounded-xl border mt-3 animate-in fade-in flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold shadow-xs ${
                lastFeedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              {lastFeedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{lastFeedback.text}</span>
            </div>
          )}
        </div>
      )}

      {/* Classification Category Choice Buttons */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
          Nhấp chọn nhóm phân loại thích hợp:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questionSet.categories.map(category => (
            <button
              key={category.id}
              disabled={Boolean(lastFeedback)}
              onClick={() => handleClassify(category.id)}
              className="p-4 sm:p-5 rounded-2xl border-2 border-sky-200 bg-white hover:bg-sky-50 hover:border-amber-400 active:scale-[0.98] transition cursor-pointer text-center group shadow-xs"
            >
              <div className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-amber-700 transition">
                {category.name}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1 group-hover:text-slate-700 font-medium">
                <span>Chọn nhóm này</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SGK Reference */}
      <div className="p-3 bg-white border border-sky-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-xs">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Cơ sở lý thuyết SGK: </span>
          {questionSet.explanation}
        </div>
      </div>
    </div>
  );
};
