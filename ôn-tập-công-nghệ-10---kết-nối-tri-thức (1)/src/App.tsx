import React, { useState, useEffect } from 'react';
import { Student, STUDENTS_10C05 } from './data/students';
import { LessonId, GameModeId, GameResultRecord } from './types/game';
import {
  getMatchingQuestions,
  getDragDropQuestions,
  getClassificationQuestions,
  getOrderingQuestions,
  getEngineerQuestions,
  LESSONS_META,
  GAME_MODES_META
} from './data/questions';
import { api } from './services/api';

import { Navbar } from './components/Navbar';
import { StudentLoginModal } from './components/StudentLoginModal';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { HomeHub } from './components/HomeHub';
import { GameSummaryModal } from './components/GameSummaryModal';
import { TeacherPortal } from './components/TeacherPortal';

import { MatchingGame } from './components/games/MatchingGame';
import { DragDropGame } from './components/games/DragDropGame';
import { ClassificationGame } from './components/games/ClassificationGame';
import { OrderingGame } from './components/games/OrderingGame';
import { EngineerGame } from './components/games/EngineerGame';

export default function App() {
  // Student state
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Teacher state
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherToken, setTeacherToken] = useState<string | null>(null);

  // View state
  const [viewMode, setViewMode] = useState<'home' | 'game' | 'teacher'>('home');

  // Game active state
  const [activeLesson, setActiveLesson] = useState<LessonId>('bai-3');
  const [activeGameMode, setActiveGameMode] = useState<GameModeId>('matching');
  const [activeSetIndex, setActiveSetIndex] = useState<number>(1);
  const [sessionId, setSessionId] = useState<string>('');

  // Review mode & wrong items
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);

  // Results & Modal
  const [lastScore, setLastScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [reviewedScore, setReviewedScore] = useState<number | undefined>(undefined);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<any>(undefined);

  // Load saved student & teacher token on mount
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem('cong_nghe_10_student');
      if (savedStudent) {
        setCurrentStudent(JSON.parse(savedStudent));
      } else {
        // Default to first student in list or prompt
        setCurrentStudent(STUDENTS_10C05[0]);
      }

      const token = localStorage.getItem('cong_nghe_10_teacher_token');
      if (token) {
        api.verifyTeacher(token).then(res => {
          if (res.success) {
            setTeacherToken(token);
          } else {
            localStorage.removeItem('cong_nghe_10_teacher_token');
          }
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectStudent = (student: Student) => {
    setCurrentStudent(student);
    localStorage.setItem('cong_nghe_10_student', JSON.stringify(student));
  };

  const handleTeacherLoginSuccess = (token: string) => {
    setTeacherToken(token);
    localStorage.setItem('cong_nghe_10_teacher_token', token);
    setViewMode('teacher');
  };

  const handleTeacherLogout = () => {
    if (teacherToken) {
      api.verifyTeacher(teacherToken); // or logout endpoint
    }
    setTeacherToken(null);
    localStorage.removeItem('cong_nghe_10_teacher_token');
    setViewMode('home');
  };

  // Launch a game
  const handleStartGame = (lessonId: LessonId, gameMode: GameModeId, setIndex: number = 1) => {
    const studentCode = currentStudent ? `${currentStudent.className}-${String(currentStudent.id).padStart(2, '0')}` : 'GUEST';
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newSessionId = `${studentCode}-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${randomSuffix}`;

    setActiveLesson(lessonId);
    setActiveGameMode(gameMode);
    setActiveSetIndex(setIndex);
    setSessionId(newSessionId);
    setIsReviewMode(false);
    setWrongQuestionIds([]);
    setReviewedScore(undefined);
    setIsSummaryOpen(false);
    setViewMode('game');
  };

  // When a game round completes
  const handleGameComplete = async (score: number, total: number, wrongs: string[]) => {
    const calculatedCorrect = Math.max(0, total - wrongs.length);
    setLastScore(score);
    setTotalQuestions(total);
    setCorrectCount(calculatedCorrect);
    setWrongQuestionIds(wrongs);

    const lessonMeta = LESSONS_META.find(l => l.id === activeLesson);
    const gameMeta = GAME_MODES_META.find(g => g.id === activeGameMode);

    if (!isReviewMode) {
      // 1. Lưu lượt chơi chính một dòng từ hàng 4 của KET_QUA_TRO_CHOI
      const record: GameResultRecord = {
        sessionId,
        timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        studentId: currentStudent?.id || 1,
        studentName: currentStudent?.name || 'Học sinh',
        className: currentStudent?.className || '10C05',
        lessonId: activeLesson,
        lessonTitle: lessonMeta?.title || activeLesson,
        gameMode: activeGameMode,
        gameModeTitle: gameMeta?.name || activeGameMode,
        setIndex: activeSetIndex,
        score,
        totalQuestions: total,
        correctCount: calculatedCorrect,
        wrongCount: wrongs.length,
        wrongQuestionIds: wrongs,
        status: 'HOAN_THANH',
      };

      const res = await api.saveInitialScore(record);
      setSyncStatus(res?.appsScriptSync);
    } else {
      // 2. Ôn lại câu sai: chỉ cập nhật cột M–O của dòng cũ bằng cách dò Mã lượt chơi
      setReviewedScore(score);
      const res = await api.updateReviewScore(sessionId, score, calculatedCorrect);
      setSyncStatus(res?.appsScriptSync);
    }

    setIsSummaryOpen(true);
  };

  // Review wrong questions only
  const handleReviewWrongOnly = () => {
    setIsSummaryOpen(false);
    setIsReviewMode(true);
    // Keep same sessionId! Game will mount with filterWrongIds
  };

  // Replay all
  const handleReplayAll = () => {
    setIsSummaryOpen(false);
    handleStartGame(activeLesson, activeGameMode, activeSetIndex);
  };

  // Switch set
  const handleSwitchSet = () => {
    setIsSummaryOpen(false);
    const nextSet = activeSetIndex === 1 ? 2 : 1;
    handleStartGame(activeLesson, activeGameMode, nextSet);
  };

  // Generate detailed wrong question explanations for the summary modal
  const getWrongQuestionDetails = () => {
    const lessonMeta = LESSONS_META.find(l => l.id === activeLesson);
    if (activeGameMode === 'matching') {
      const q = getMatchingQuestions(activeLesson, activeSetIndex);
      return wrongQuestionIds.map(id => {
        const pair = q.pairs.find(p => p.id === id);
        return {
          id,
          title: `Ghép cặp: ${pair?.term || id}`,
          explanation: pair?.description || q.explanation,
        };
      });
    } else if (activeGameMode === 'drag-drop') {
      const q = getDragDropQuestions(activeLesson, activeSetIndex);
      return wrongQuestionIds.map(id => {
        const item = q.items.find(it => it.id === id);
        const slot = q.slots.find(s => s.id === item?.targetSlotId);
        return {
          id,
          title: `Kéo thả: ${item?.text || id}`,
          explanation: `Nằm trong ô "${slot?.label}". ${slot?.description || q.explanation}`,
        };
      });
    } else if (activeGameMode === 'classification') {
      const q = getClassificationQuestions(activeLesson, activeSetIndex);
      return wrongQuestionIds.map(id => {
        const item = q.items.find(it => it.id === id);
        const cat = q.categories.find(c => c.id === item?.categoryId);
        return {
          id,
          title: `Phân loại: ${item?.text || id}`,
          explanation: `Thuộc nhóm "${cat?.name}". ${item?.detailHint || q.explanation}`,
        };
      });
    } else if (activeGameMode === 'ordering') {
      const q = getOrderingQuestions(activeLesson, activeSetIndex);
      return wrongQuestionIds.map(id => {
        const step = q.steps.find(s => s.id === id);
        return {
          id,
          title: `Sắp xếp: ${step?.text || id}`,
          explanation: `Vị trí đúng là bước ${step ? step.correctIndex + 1 : ''}. ${step?.hint || q.explanation}`,
        };
      });
    } else if (activeGameMode === 'engineer') {
      const list = getEngineerQuestions(activeLesson, activeSetIndex);
      return wrongQuestionIds.map(id => {
        const q = list.find(it => it.id === id);
        return {
          id,
          title: q?.title || 'Tình huống kỹ thuật',
          explanation: q?.explanation || 'Xem lại căn cứ kỹ thuật SGK Công nghệ 10.',
        };
      });
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-[#eaf5fc]/80 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentStudent={currentStudent}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        isTeacherLoggedIn={Boolean(teacherToken)}
        onOpenTeacherPortal={() => setViewMode('teacher')}
        onGoHome={() => setViewMode('home')}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {viewMode === 'home' && (
          <HomeHub
            currentStudent={currentStudent}
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
            onStartGame={handleStartGame}
          />
        )}

        {viewMode === 'teacher' && (
          <TeacherPortal
            onLogout={handleTeacherLogout}
            onClose={() => setViewMode('home')}
          />
        )}

        {viewMode === 'game' && (
          <div className="space-y-4">
            {activeGameMode === 'matching' && (
              <MatchingGame
                questionSet={getMatchingQuestions(activeLesson, activeSetIndex)}
                filterWrongIds={isReviewMode ? wrongQuestionIds : undefined}
                onComplete={handleGameComplete}
                onExit={() => setViewMode('home')}
              />
            )}

            {activeGameMode === 'drag-drop' && (
              <DragDropGame
                questionSet={getDragDropQuestions(activeLesson, activeSetIndex)}
                filterWrongIds={isReviewMode ? wrongQuestionIds : undefined}
                onComplete={handleGameComplete}
                onExit={() => setViewMode('home')}
              />
            )}

            {activeGameMode === 'classification' && (
              <ClassificationGame
                questionSet={getClassificationQuestions(activeLesson, activeSetIndex)}
                filterWrongIds={isReviewMode ? wrongQuestionIds : undefined}
                onComplete={handleGameComplete}
                onExit={() => setViewMode('home')}
              />
            )}

            {activeGameMode === 'ordering' && (
              <OrderingGame
                questionSet={getOrderingQuestions(activeLesson, activeSetIndex)}
                filterWrongIds={isReviewMode ? wrongQuestionIds : undefined}
                onComplete={handleGameComplete}
                onExit={() => setViewMode('home')}
              />
            )}

            {activeGameMode === 'engineer' && (
              <EngineerGame
                questions={getEngineerQuestions(activeLesson, activeSetIndex)}
                filterWrongIds={isReviewMode ? wrongQuestionIds : undefined}
                onComplete={handleGameComplete}
                onExit={() => setViewMode('home')}
              />
            )}
          </div>
        )}
      </main>

      {/* Student Profile / Roster Picker Modal */}
      <StudentLoginModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSelectStudent={handleSelectStudent}
        currentStudent={currentStudent}
      />

      {/* Teacher Login Modal */}
      <TeacherLoginModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onLoginSuccess={handleTeacherLoginSuccess}
      />

      {/* Summary / Result Modal */}
      {isSummaryOpen && (
        <GameSummaryModal
          score={lastScore}
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          wrongCount={wrongQuestionIds.length}
          sessionId={sessionId}
          isReviewMode={isReviewMode}
          reviewedScore={reviewedScore}
          syncStatus={syncStatus}
          wrongQuestionDetails={getWrongQuestionDetails()}
          onReviewWrongOnly={handleReviewWrongOnly}
          onReplayAll={handleReplayAll}
          onSwitchSet={handleSwitchSet}
          onGoHome={() => {
            setIsSummaryOpen(false);
            setViewMode('home');
          }}
        />
      )}

      {/* Global Footer */}
      <footer className="border-t border-sky-200/80 bg-white/70 backdrop-blur-sm py-4 px-3 text-center text-xs text-slate-500 space-y-1 mt-6">
        <p className="font-medium text-slate-600">
          Hệ thống Ôn tập Trực tuyến Công nghệ 10 • Bộ sách Kết nối tri thức với cuộc sống
        </p>
        <p className="text-[11px] text-slate-400">
          Tích hợp Google Sheets ID: <span className="font-mono text-cyan-700">16bPIYS-Wbffwjef2b-bcj2SPiqz_eepsWnDlID7bUrY</span> & Trợ lý Kỹ thuật AI Gemini
        </p>
      </footer>
    </div>
  );
}
