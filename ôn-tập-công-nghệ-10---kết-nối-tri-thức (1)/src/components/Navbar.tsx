import React from 'react';
import { Student } from '../data/students';
import { BookOpen, User, GraduationCap, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentStudent: Student | null;
  onOpenStudentModal: () => void;
  onOpenTeacherModal: () => void;
  isTeacherLoggedIn: boolean;
  onOpenTeacherPortal: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStudent,
  onOpenStudentModal,
  onOpenTeacherModal,
  isTeacherLoggedIn,
  onOpenTeacherPortal,
  onGoHome,
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(soundManager.enabled);

  const toggleSound = () => {
    soundManager.enabled = !soundManager.enabled;
    setSoundEnabled(soundManager.enabled);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                CÔNG NGHỆ 10
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300">
                KNTT
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Ôn tập Bài 3, 4, 6 • Kết nối Tri thức với Cuộc sống
            </p>
          </div>
        </button>

        {/* Actions & Student Status */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-slate-600 border border-sky-200 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Student Profile Button */}
          {currentStudent ? (
            <button
              onClick={onOpenStudentModal}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50/80 border border-sky-200 text-left transition shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-100 border border-cyan-300 text-cyan-800 flex items-center justify-center font-bold text-xs">
                {currentStudent.id}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-slate-800 max-w-[110px] sm:max-w-[150px] truncate">
                  {currentStudent.name}
                </div>
                <div className="text-[10px] text-cyan-600 font-semibold">
                  Lớp {currentStudent.className}
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenStudentModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Đăng nhập học sinh</span>
            </button>
          )}

          {/* Teacher Button */}
          {isTeacherLoggedIn ? (
            <button
              onClick={onOpenTeacherPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-yellow-300" />
              <span className="hidden sm:inline">Cổng GV Mai Hằng</span>
              <span className="sm:hidden">GV</span>
            </button>
          ) : (
            <button
              onClick={onOpenTeacherModal}
              title="Đăng nhập dành cho Giáo viên"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 font-semibold text-xs shadow-xs transition cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Giáo Viên</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
