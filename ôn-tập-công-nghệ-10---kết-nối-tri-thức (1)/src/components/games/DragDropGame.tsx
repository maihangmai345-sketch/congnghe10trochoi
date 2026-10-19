import React, { useState, useEffect } from 'react';
import { DragDropQuestionSet, DragDropItem, DragDropSlot } from '../../types/game';
import { soundManager } from '../../utils/audio';
import { Move, CheckCircle2, XCircle, Lightbulb, RefreshCw, HelpCircle } from 'lucide-react';
import { shuffleArray } from '../../data/questions';

interface DragDropGameProps {
  questionSet: DragDropQuestionSet;
  filterWrongIds?: string[];
  onComplete: (score: number, total: number, wrongIds: string[]) => void;
  onExit: () => void;
}

export const DragDropGame: React.FC<DragDropGameProps> = ({
  questionSet,
  filterWrongIds,
  onComplete,
  onExit,
}) => {
  const [itemsToPlace, setItemsToPlace] = useState<DragDropItem[]>([]);
  const [slots, setSlots] = useState<DragDropSlot[]>([]);
  // Map slotId -> itemId placed
  const [placements, setPlacements] = useState<{ [slotId: string]: string | null }>({});
  const [selectedItemToPlace, setSelectedItemToPlace] = useState<string | null>(null);

  const [hasChecked, setHasChecked] = useState(false);
  const [resultDetails, setResultDetails] = useState<{ [slotId: string]: boolean }>({});
  const [wrongItems, setWrongItems] = useState<string[]>([]);

  useEffect(() => {
    let items = [...questionSet.items];
    if (filterWrongIds && filterWrongIds.length > 0) {
      items = items.filter(it => filterWrongIds.includes(it.id));
      if (items.length === 0) items = [...questionSet.items];
    }
    setItemsToPlace(shuffleArray(items));

    // Slots corresponding to items
    const relevantSlotIds = new Set(items.map(it => it.targetSlotId));
    setSlots(questionSet.slots.filter(s => relevantSlotIds.has(s.id)));

    setPlacements({});
    setSelectedItemToPlace(null);
    setHasChecked(false);
    setResultDetails({});
    setWrongItems([]);
  }, [questionSet, filterWrongIds]);

  // Determine unplaced items
  const placedItemIds = new Set(Object.values(placements).filter(Boolean) as string[]);
  const unplacedItems = itemsToPlace.filter(it => !placedItemIds.has(it.id));

  // Mobile Tap-to-Place handler
  const handleSelectItem = (itemId: string) => {
    if (hasChecked) return;
    if (selectedItemToPlace === itemId) {
      setSelectedItemToPlace(null);
    } else {
      setSelectedItemToPlace(itemId);
    }
  };

  const handleSlotClick = (slotId: string) => {
    if (hasChecked) return;
    if (selectedItemToPlace) {
      // Place the selected item into this slot
      setPlacements(prev => ({
        ...prev,
        [slotId]: selectedItemToPlace,
      }));
      setSelectedItemToPlace(null);
    } else if (placements[slotId]) {
      // Remove item from slot
      setPlacements(prev => ({
        ...prev,
        [slotId]: null,
      }));
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (hasChecked) return;
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      setPlacements(prev => ({
        ...prev,
        [slotId]: itemId,
      }));
    }
  };

  // Check answers
  const handleCheckAnswers = () => {
    const checks: { [slotId: string]: boolean } = {};
    const wrongs: string[] = [];
    let correctCount = 0;

    slots.forEach(slot => {
      const placedItemId = placements[slot.id];
      const isCorrect = placedItemId ? itemsToPlace.find(it => it.id === placedItemId)?.targetSlotId === slot.id : false;
      checks[slot.id] = isCorrect;
      if (isCorrect) {
        correctCount += 1;
      } else {
        if (placedItemId) wrongs.push(placedItemId);
        else {
          const expected = itemsToPlace.find(it => it.targetSlotId === slot.id);
          if (expected) wrongs.push(expected.id);
        }
      }
    });

    setResultDetails(checks);
    setWrongItems(wrongs);
    setHasChecked(true);

    const total = slots.length;
    const score = Math.round((correctCount / total) * 10);

    if (wrongs.length === 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    setTimeout(() => {
      onComplete(score, total, wrongs);
    }, 1800);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedItemToPlace(null);
    setHasChecked(false);
    setResultDetails({});
  };

  const allPlaced = slots.length > 0 && slots.every(s => Boolean(placements[s.id]));

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-fit">
              <Move className="w-3.5 h-3.5" />
              Kéo thả tương tác
            </span>
            <h2 className="text-base sm:text-xl font-bold text-slate-800">
              {questionSet.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {questionSet.instruction} (Kéo hoặc chạm chọn nhãn rồi chạm vào ô đích)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Đặt lại các ô"
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

      {/* Available Items Pool */}
      <div className="bg-white border border-sky-200 rounded-2xl p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Các nhãn cần đặt ({unplacedItems.length} chưa đặt):</span>
          {selectedItemToPlace && (
            <span className="text-cyan-700 animate-pulse lowercase font-bold">
              Đang chọn 1 nhãn. Hãy chạm vào ô đích bên dưới!
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 min-h-[48px] items-center">
          {unplacedItems.map(item => {
            const isSelected = selectedItemToPlace === item.id;
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onClick={() => handleSelectItem(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer select-none transition-all shadow-xs ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md scale-105 ring-2 ring-cyan-400'
                    : 'bg-sky-50/80 hover:bg-sky-100 text-slate-800 border-sky-300'
                }`}
              >
                {item.text}
              </div>
            );
          })}
          {unplacedItems.length === 0 && (
            <div className="text-xs text-emerald-700 font-bold py-1">
              Đã phân bổ hết các nhãn vào ô! Bạn có thể nhấn "Kiểm tra kết quả".
            </div>
          )}
        </div>
      </div>

      {/* Target Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {slots.map(slot => {
          const placedItemId = placements[slot.id];
          const placedItem = itemsToPlace.find(it => it.id === placedItemId);
          const isCorrect = resultDetails[slot.id];

          return (
            <div
              key={slot.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slot.id)}
              onClick={() => handleSlotClick(slot.id)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                hasChecked
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : 'bg-rose-50 border-rose-400 text-rose-900'
                  : placedItem
                  ? 'bg-sky-50 border-cyan-500 shadow-xs'
                  : selectedItemToPlace
                  ? 'bg-cyan-50/60 border-dashed border-cyan-400 hover:bg-cyan-50'
                  : 'bg-white border-dashed border-sky-300 hover:border-cyan-400'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-slate-400 mb-0.5">Ô Định Nghĩa / Chức Năng:</div>
                <div className="font-bold text-sm sm:text-base text-slate-800">
                  {slot.label}
                </div>
                {slot.description && (
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    {slot.description}
                  </div>
                )}
              </div>

              {/* Placed content area */}
              <div className="pt-2 border-t border-sky-100 flex items-center justify-between">
                {placedItem ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs sm:text-sm font-bold text-cyan-800 bg-cyan-100/80 px-2.5 py-1 rounded-lg border border-cyan-300">
                      {placedItem.text}
                    </span>
                    {hasChecked ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                      )
                    ) : (
                      <span className="text-[11px] text-slate-400 hover:text-rose-600 font-medium">
                        Chạm để gỡ ✕
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic py-1">
                    {selectedItemToPlace ? 'Chạm vào đây để đặt nhãn' : 'Chưa có nhãn (Kéo hoặc chạm đặt)'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Check Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <HelpCircle className="w-4 h-4 text-cyan-600" />
          <span>Đặt nhãn vào tất cả các ô trước khi kiểm tra</span>
        </div>
        <button
          onClick={handleCheckAnswers}
          disabled={!allPlaced || hasChecked}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition cursor-pointer"
        >
          {hasChecked ? 'Đang hoàn tất...' : 'Kiểm tra kết quả →'}
        </button>
      </div>

      {/* SGK Explanation */}
      <div className="p-3 bg-white border border-sky-200 rounded-xl text-xs text-slate-600 flex items-start gap-2 shadow-xs">
        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Giải thích chuẩn SGK: </span>
          {questionSet.explanation}
        </div>
      </div>
    </div>
  );
};
