import React, { useState, useEffect } from 'react';
import { OrderingQuestionSet, OrderStep } from '../../types/game';
import { soundManager } from '../../utils/audio';
import { ArrowDownUp, ChevronUp, ChevronDown, CheckCircle2, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { shuffleArray } from '../../data/questions';

interface OrderingGameProps {
  questionSet: OrderingQuestionSet;
  filterWrongIds?: string[];
  onComplete: (score: number, total: number, wrongIds: string[]) => void;
  onExit: () => void;
}

export const OrderingGame: React.FC<OrderingGameProps> = ({
  questionSet,
  filterWrongIds,
  onComplete,
  onExit,
}) => {
  const [currentSteps, setCurrentSteps] = useState<OrderStep[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [stepResults, setStepResults] = useState<{ [stepId: string]: boolean }>({});
  const [wrongStepIds, setWrongStepIds] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle steps initially so they are disordered
    let base = [...questionSet.steps];
    setCurrentSteps(shuffleArray(base));
    setHasChecked(false);
    setStepResults({});
    setWrongStepIds([]);
  }, [questionSet, filterWrongIds]);

  const moveUp = (index: number) => {
    if (index === 0 || hasChecked) return;
    const next = [...currentSteps];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    setCurrentSteps(next);
  };

  const moveDown = (index: number) => {
    if (index === currentSteps.length - 1 || hasChecked) return;
    const next = [...currentSteps];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    setCurrentSteps(next);
  };

  const handleCheck = () => {
    const results: { [stepId: string]: boolean } = {};
    const wrongs: string[] = [];
    let correctCount = 0;

    currentSteps.forEach((step, index) => {
      const isCorrect = step.correctIndex === index;
      results[step.id] = isCorrect;
      if (isCorrect) {
        correctCount += 1;
      } else {
        wrongs.push(step.id);
      }
    });

    setStepResults(results);
    setWrongStepIds(wrongs);
    setHasChecked(true);

    const total = currentSteps.length;
    const score = Math.round((correctCount / total) * 10);

    if (wrongs.length === 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    setTimeout(() => {
      onComplete(score, total, wrongs);
    }, 2000);
  };

  const handleShuffle = () => {
    setCurrentSteps(shuffleArray([...questionSet.steps]));
    setHasChecked(false);
    setStepResults({});
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1 w-fit">
              <ArrowDownUp className="w-3.5 h-3.5" />
              Sắp xếp trình tự & thời gian
            </span>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {questionSet.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {questionSet.instruction} (Dùng nút mũi tên Lên/Xuống để điều chỉnh vị trí)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Xáo trộn lại"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              Thoát
            </button>
          </div>
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-2.5">
        {currentSteps.map((step, index) => {
          const isEvaluated = hasChecked;
          const isCorrect = stepResults[step.id];

          return (
            <div
              key={step.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 shadow-xs ${
                isEvaluated
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                  : 'bg-white border-sky-200 text-slate-800 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 border border-purple-300 text-purple-900 flex items-center justify-center font-bold text-xs shrink-0">
                  {index + 1}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold leading-snug">
                    {step.text}
                  </div>
                  {step.hint && (
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {step.hint}
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Action Controls */}
              <div className="flex items-center gap-1 shrink-0">
                {isEvaluated ? (
                  isCorrect ? (
                    <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold px-2 py-1 bg-emerald-100/80 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Đúng vị trí</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-rose-700 text-xs font-bold px-2 py-1 bg-rose-100/80 rounded-lg">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Sai (Vị trí đúng: {step.correctIndex + 1})</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 disabled:opacity-30 text-slate-700 border border-sky-200 transition cursor-pointer"
                      title="Chuyển lên trên"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === currentSteps.length - 1}
                      className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 disabled:opacity-30 text-slate-700 border border-sky-200 transition cursor-pointer"
                      title="Chuyển xuống dưới"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Check Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-500 font-medium">
          Hãy di chuyển các bước sao cho đúng trình tự logic hoặc thời gian
        </div>
        <button
          onClick={handleCheck}
          disabled={hasChecked}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition cursor-pointer"
        >
          {hasChecked ? 'Đang chấm điểm...' : 'Kiểm tra trình tự →'}
        </button>
      </div>

      {/* SGK Explanation */}
      <div className="p-3 bg-white border border-sky-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-xs">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Chuẩn tiến trình SGK: </span>
          {questionSet.explanation}
        </div>
      </div>
    </div>
  );
};
