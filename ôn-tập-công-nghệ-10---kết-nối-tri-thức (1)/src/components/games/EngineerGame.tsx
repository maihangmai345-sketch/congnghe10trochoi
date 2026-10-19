import React, { useState, useEffect } from 'react';
import { EngineerScenarioQuestion } from '../../types/game';
import { api } from '../../services/api';
import { soundManager } from '../../utils/audio';
import { Wrench, CheckCircle2, XCircle, Bot, Sparkles, Lightbulb, ArrowRight, Loader2 } from 'lucide-react';
import { shuffleArray } from '../../data/questions';

interface EngineerGameProps {
  questions: EngineerScenarioQuestion[];
  filterWrongIds?: string[];
  onComplete: (score: number, total: number, wrongIds: string[]) => void;
  onExit: () => void;
}

export const EngineerGame: React.FC<EngineerGameProps> = ({
  questions,
  filterWrongIds,
  onComplete,
  onExit,
}) => {
  const [activeQuestions, setActiveQuestions] = useState<EngineerScenarioQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);

  // AI Mentor Hint State
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    let base = [...questions];
    if (filterWrongIds && filterWrongIds.length > 0) {
      base = base.filter(q => filterWrongIds.includes(q.id));
      if (base.length === 0) base = [...questions];
    }
    setActiveQuestions(shuffleArray(base));
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongQuestionIds([]);
    resetQuestionState();
  }, [questions, filterWrongIds]);

  const resetQuestionState = () => {
    setSelectedOptionId(null);
    setHasAnswered(false);
    setAiHint(null);
    setIsLoadingAi(false);
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (hasAnswered || !currentQ) return;
    setSelectedOptionId(optId);
    setHasAnswered(true);

    const chosen = currentQ.options.find(o => o.id === optId);
    const isCorrect = Boolean(chosen?.isCorrect);

    if (isCorrect) {
      soundManager.playCorrect();
      setCorrectCount(prev => prev + 1);
    } else {
      soundManager.playWrong();
      setWrongQuestionIds(prev => [...prev, currentQ.id]);
    }
  };

  const handleNext = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < activeQuestions.length) {
      setCurrentIndex(nextIdx);
      resetQuestionState();
    } else {
      // Completed all questions in scenario
      const total = activeQuestions.length;
      const score = Math.round((correctCount / total) * 10);
      onComplete(score, total, wrongQuestionIds);
    }
  };

  const handleAskAiMentor = async () => {
    if (!currentQ || isLoadingAi) return;
    setIsLoadingAi(true);
    setAiHint(null);

    try {
      const res = await api.getGeminiEngineerHint({
        role: currentQ.role,
        scenario: currentQ.scenario,
        options: currentQ.options.map(o => ({ id: o.id, text: o.text })),
        userChoiceId: selectedOptionId || undefined,
      });

      if (res && res.hint) {
        setAiHint(res.hint);
      }
    } catch {
      setAiHint('Gợi ý: Hãy dựa vào tính chất công nghệ trong SGK Công nghệ 10 để tìm giải pháp tối ưu!');
    } finally {
      setIsLoadingAi(false);
    }
  };

  if (!currentQ) return null;

  const chosenOption = currentQ.options.find(o => o.id === selectedOptionId);
  const isCorrectAnswer = chosenOption?.isCorrect;
  const progress = activeQuestions.length > 0 ? ((currentIndex + (hasAnswered ? 1 : 0)) / activeQuestions.length) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5" />
                Nhà Kĩ Sư Tương Lai - Xử lý tình huống
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-300">
                Vai trò: {currentQ.role}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {currentQ.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">Tình huống</div>
              <div className="text-sm sm:text-base font-bold text-rose-700 font-mono">
                {currentIndex + 1} / {activeQuestions.length}
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
            className="bg-gradient-to-r from-rose-500 to-amber-500 h-2 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scenario Challenge Card */}
      <div className="bg-white border border-sky-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Bài toán kỹ thuật thực tế:</span>
          </div>

          {/* Ask AI Mentor button */}
          <button
            onClick={handleAskAiMentor}
            disabled={isLoadingAi}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-800 text-xs font-bold transition cursor-pointer shadow-xs"
          >
            {isLoadingAi ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-600" />
                <span>AI đang phân tích...</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-cyan-600" />
                <span>Hỏi Cố vấn Kỹ sư AI</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
          {currentQ.scenario}
        </p>

        {/* AI Hint Callout if requested */}
        {aiHint && (
          <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-300 text-xs sm:text-sm text-cyan-950 flex items-start gap-2.5 animate-in fade-in shadow-xs">
            <Bot className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-cyan-900">Lời khuyên từ Cố vấn AI:</span>
              <p className="leading-relaxed text-slate-700 font-medium">{aiHint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          Chọn giải pháp kỹ thuật tối ưu nhất:
        </div>
        <div className="space-y-2.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            let buttonStyle = 'bg-white hover:bg-sky-50 border-sky-200 text-slate-800 shadow-xs';
            if (hasAnswered) {
              if (option.isCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 cursor-pointer ${buttonStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                  hasAnswered && option.isCorrect
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : hasAnswered && isSelected
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-sky-100 border-sky-200 text-slate-700'
                }`}>
                  {letter}
                </span>

                <div className="flex-1 text-xs sm:text-sm font-semibold leading-relaxed">
                  {option.text}
                </div>

                {hasAnswered && option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {hasAnswered && isSelected && !option.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* In-depth Feedback & Explanation */}
      {hasAnswered && chosenOption && (
        <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 animate-in fade-in shadow-xs ${
          isCorrectAnswer
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            {isCorrectAnswer ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Giải pháp chuẩn xác của Kỹ sư tài năng!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Phương án chưa tối ưu trong thực tiễn!</span>
              </>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {chosenOption.engineerFeedback}
          </p>

          {currentQ.realWorldImpact && (
            <div className="pt-2 border-t border-sky-200/60 text-xs text-amber-800 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Ý nghĩa thực tiễn: {currentQ.realWorldImpact}</span>
            </div>
          )}

          <div className="pt-3 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/20 flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>{currentIndex + 1 < activeQuestions.length ? 'Tình huống tiếp theo' : 'Xem tổng kết kết quả'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SGK Reference */}
      <div className="p-3 bg-white border border-sky-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-xs">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Căn cứ SGK Công nghệ 10: </span>
          {currentQ.explanation}
        </div>
      </div>
    </div>
  );
};
