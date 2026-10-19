export type LessonId = 'bai-3' | 'bai-4' | 'bai-6' | 'tong-hop';

export type GameModeId = 'matching' | 'drag-drop' | 'classification' | 'ordering' | 'engineer';

export interface BaseQuestion {
  id: string;
  lessonId: LessonId;
  title: string;
  explanation: string; // Trích dẫn SGK & giải thích chi tiết
}

// 1. Ghép đôi hình ảnh / khái niệm
export interface MatchingPair {
  id: string;
  term: string; // Tên công nghệ / Khái niệm
  description: string; // Đặc điểm / Ứng dụng / Hình ảnh mô tả
  iconName?: string; // Tên icon Lucide
  imageUrl?: string; // Optional SVG/Icon avatar
}

export interface MatchingQuestionSet extends BaseQuestion {
  type: 'matching';
  pairs: MatchingPair[];
}

// 2. Kéo thả (Drag and Drop)
export interface DragDropItem {
  id: string;
  text: string;
  targetSlotId: string;
}

export interface DragDropSlot {
  id: string;
  label: string;
  description?: string;
}

export interface DragDropQuestionSet extends BaseQuestion {
  type: 'drag-drop';
  instruction: string;
  slots: DragDropSlot[];
  items: DragDropItem[];
}

// 3. Phân loại (Classification / Sorting)
export interface ClassificationCategory {
  id: string;
  name: string;
  color?: string;
}

export interface ClassificationItem {
  id: string;
  text: string;
  categoryId: string;
  detailHint?: string;
}

export interface ClassificationQuestionSet extends BaseQuestion {
  type: 'classification';
  instruction: string;
  categories: ClassificationCategory[];
  items: ClassificationItem[];
}

// 4. Sắp xếp thứ tự (Ordering)
export interface OrderStep {
  id: string;
  text: string;
  correctIndex: number; // 0, 1, 2, ...
  hint?: string;
}

export interface OrderingQuestionSet extends BaseQuestion {
  type: 'ordering';
  instruction: string;
  steps: OrderStep[];
}

// 5. Nhà kĩ sư tương lai - xử lý tình huống (Scenario)
export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  engineerFeedback: string;
}

export interface EngineerScenarioQuestion extends BaseQuestion {
  type: 'engineer';
  scenario: string; // Đặt bối cảnh kỹ thuật
  role: string; // Vai trò của em (ví dụ: Kỹ sư cơ khí, Kỹ sư năng lượng...)
  options: ScenarioOption[];
  realWorldImpact?: string;
}

export interface GameResultRecord {
  sessionId: string;
  timestamp: string;
  studentId: number;
  studentName: string;
  className: string;
  lessonId: LessonId;
  lessonTitle: string;
  gameMode: GameModeId;
  gameModeTitle: string;
  setIndex: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  wrongQuestionIds: string[];
  // Cột M-O: Kết quả ôn lại
  reviewedScore?: number;
  reviewedCorrectCount?: number;
  reviewedTimestamp?: string;
  status: 'HOAN_THANH' | 'DA_ON_TAP';
}
