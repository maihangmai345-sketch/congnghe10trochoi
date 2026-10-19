import React, { useState } from 'react';
import { Student, STUDENTS_10C05, STUDENTS_10C06 } from '../data/students';
import { X, UserCheck, Search, Sparkles } from 'lucide-react';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (student: Student) => void;
  currentStudent: Student | null;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  currentStudent,
}) => {
  const [selectedClass, setSelectedClass] = useState<'10C05' | '10C06'>(
    currentStudent?.className || '10C05'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [customName, setCustomName] = useState(currentStudent?.name || '');
  const [customId, setCustomId] = useState<number | ''>(currentStudent?.id || '');

  if (!isOpen) return null;

  const currentRoster = selectedClass === '10C05' ? STUDENTS_10C05 : STUDENTS_10C06;

  const filteredStudents = currentRoster.filter(s => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      s.name.toLowerCase().includes(term) ||
      s.id.toString() === term ||
      `stt ${s.id}`.includes(term)
    );
  });

  const handlePickStudent = (student: Student) => {
    onSelectStudent(student);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const finalStudent: Student = {
      id: Number(customId) || 99,
      name: customName.trim(),
      className: selectedClass,
    };
    onSelectStudent(finalStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-sky-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 border border-cyan-300 flex items-center justify-center text-cyan-700">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Thông Tin Học Sinh
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Chọn tên từ danh sách hoặc tự nhập để ghi nhận điểm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Class Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Chọn Lớp Học
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedClass('10C05');
                  setSearchTerm('');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                  selectedClass === '10C05'
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-800 shadow-sm ring-1 ring-cyan-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>Lớp 10C05</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  46 HS
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedClass('10C06');
                  setSearchTerm('');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                  selectedClass === '10C06'
                    ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>Lớp 10C06</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  48 HS
                </span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm nhanh theo STT hoặc Tên học sinh (${selectedClass})...`}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick Roster List */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span>Danh sách học sinh chính thức:</span>
              <span>{filteredStudents.length} học sinh</span>
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 border border-sky-100 rounded-xl p-1.5 bg-slate-50/70">
              {filteredStudents.map((s) => {
                const isSelected =
                  currentStudent?.name === s.name &&
                  currentStudent?.className === s.className;
                return (
                  <button
                    key={`${s.className}-${s.id}`}
                    type="button"
                    onClick={() => handlePickStudent(s)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs sm:text-sm transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-100 text-cyan-900 font-bold border border-cyan-300'
                        : 'text-slate-700 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                        {s.id}
                      </span>
                      <span className="truncate">{s.name}</span>
                    </div>
                    {isSelected ? (
                      <span className="text-[11px] text-cyan-700 font-bold shrink-0 ml-2">
                        Đang chọn
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                        Chọn →
                      </span>
                    )}
                  </button>
                );
              })}
              {filteredStudents.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-500">
                  Không tìm thấy học sinh với từ khóa "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          {/* Custom / Manual Input Section */}
          <div className="pt-2 border-t border-slate-150">
            <details className="group">
              <summary className="text-xs font-semibold text-slate-500 hover:text-cyan-700 cursor-pointer list-none flex items-center justify-between py-1">
                <span>Hoặc tự nhập thông tin khác</span>
                <span className="text-[10px] text-slate-400 group-open:rotate-180 transition">▼</span>
              </summary>
              <form onSubmit={handleManualSubmit} className="space-y-2 mt-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={customId}
                      onChange={(e) => setCustomId(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Mã (STT)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Họ và tên học sinh"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer"
                >
                  Xác nhận thông tin tự nhập
                </button>
              </form>
            </details>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Tự động đồng bộ Google Sheets ID: 16bPIYS...
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
