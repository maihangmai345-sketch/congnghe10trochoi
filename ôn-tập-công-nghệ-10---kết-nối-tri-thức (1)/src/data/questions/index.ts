import { LessonId, GameModeId } from '../../types/game';
import { MATCHING_QUESTIONS } from './matchingQuestions';
import { DRAG_DROP_QUESTIONS } from './dragDropQuestions';
import { CLASSIFICATION_QUESTIONS } from './classificationQuestions';
import { ORDERING_QUESTIONS } from './orderingQuestions';
import { ENGINEER_QUESTIONS } from './engineerQuestions';

export {
  MATCHING_QUESTIONS,
  DRAG_DROP_QUESTIONS,
  CLASSIFICATION_QUESTIONS,
  ORDERING_QUESTIONS,
  ENGINEER_QUESTIONS
};

export const LESSONS_META = [
  {
    id: 'bai-3' as LessonId,
    title: 'Bài 3: 10 Công nghệ phổ biến',
    subtitle: 'Lĩnh vực Luyện kim, Cơ khí & Điện - Điện tử',
    badge: '10 Công nghệ',
    color: 'from-amber-500 to-orange-600',
    description: 'Nắm vững bản chất, nguyên lý và sản phẩm của 10 công nghệ cốt lõi trong đời sống và sản xuất công nghiệp.'
  },
  {
    id: 'bai-4' as LessonId,
    title: 'Bài 4: Một số công nghệ mới',
    subtitle: '7 Công nghệ tiên phong thời đại mới',
    badge: '7 Công nghệ mới',
    color: 'from-cyan-500 to-blue-600',
    description: 'Khám phá công nghệ Nano, CAD/CAM/CNC, In 3D, Năng lượng tái tạo, Trí tuệ nhân tạo (AI), IoT và Robot thông minh.'
  },
  {
    id: 'bai-6' as LessonId,
    title: 'Bài 6: Các cuộc cách mạng công nghiệp',
    subtitle: '4 Cuộc cách mạng làm thay đổi văn minh nhân loại',
    badge: '4 Cuộc CMCN',
    color: 'from-purple-500 to-indigo-600',
    description: 'Tìm hiểu bối cảnh, thành tựu, vai trò và đặc trưng của 4 cuộc cách mạng công nghiệp từ thế kỉ XVIII đến nay.'
  },
  {
    id: 'tong-hop' as LessonId,
    title: 'Tổng hợp Bài 3, Bài 4 & Bài 6',
    subtitle: 'Ôn tập toàn diện chuẩn kiến thức SGK',
    badge: 'Đấu trường Đỉnh cao',
    color: 'from-emerald-500 to-teal-600',
    description: 'Thử thách liên bài kết hợp các kiến thức cơ khí, điện tử, công nghệ mới và tiến trình phát triển công nghiệp.'
  }
];

export const GAME_MODES_META = [
  {
    id: 'matching' as GameModeId,
    name: 'Ghép đôi hình ảnh',
    english: 'Image / Concept Matching',
    icon: 'Layers',
    color: 'border-blue-500 text-blue-400 bg-blue-500/10',
    description: 'Nối các thuật ngữ công nghệ với đặc điểm, sản phẩm hoặc hình ảnh tương ứng.'
  },
  {
    id: 'drag-drop' as GameModeId,
    name: 'Kéo thả tương tác',
    english: 'Interactive Drag & Drop',
    icon: 'Move',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    description: 'Kéo nhãn công nghệ vào đúng ô định nghĩa, bản chất kỹ thuật hoặc sơ đồ sản xuất.'
  },
  {
    id: 'classification' as GameModeId,
    name: 'Phân loại công nghệ',
    english: 'Category Sorting',
    icon: 'FolderTree',
    color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    description: 'Phân chia các thiết bị, hiện tượng, vật liệu vào đúng các nhóm chuyên ngành.'
  },
  {
    id: 'ordering' as GameModeId,
    name: 'Sắp xếp trình tự',
    english: 'Chronology & Steps',
    icon: 'ArrowDownUp',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    description: 'Sắp xếp đúng quy trình công nghệ kỹ thuật hoặc dòng thời gian các phát minh lịch sử.'
  },
  {
    id: 'engineer' as GameModeId,
    name: 'Nhà kĩ sư tương lai',
    english: 'Future Engineer Scenarios',
    icon: 'Wrench',
    color: 'border-rose-500 text-rose-400 bg-rose-500/10',
    description: 'Hóa thân thành kỹ sư chuyên môn giải quyết bài toán kỹ thuật thực tế với trợ giúp từ AI.'
  }
];

// Helper to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Get matching question by lesson and set (1 or 2)
export function getMatchingQuestions(lessonId: LessonId, setIndex: number = 1) {
  const list = MATCHING_QUESTIONS.filter(q => q.lessonId === lessonId);
  const selected = list[setIndex - 1] || list[0];
  return selected;
}

// Get drag-drop question by lesson and set
export function getDragDropQuestions(lessonId: LessonId, setIndex: number = 1) {
  const list = DRAG_DROP_QUESTIONS.filter(q => q.lessonId === lessonId);
  const selected = list[setIndex - 1] || list[0];
  return selected;
}

// Get classification question by lesson and set
export function getClassificationQuestions(lessonId: LessonId, setIndex: number = 1) {
  const list = CLASSIFICATION_QUESTIONS.filter(q => q.lessonId === lessonId);
  const selected = list[setIndex - 1] || list[0];
  return selected;
}

// Get ordering question by lesson and set
export function getOrderingQuestions(lessonId: LessonId, setIndex: number = 1) {
  const list = ORDERING_QUESTIONS.filter(q => q.lessonId === lessonId);
  const selected = list[setIndex - 1] || list[0];
  return selected;
}

// Get engineer questions by lesson and set
export function getEngineerQuestions(lessonId: LessonId, setIndex: number = 1) {
  const list = ENGINEER_QUESTIONS.filter(q => q.lessonId === lessonId);
  // If set 1, take first 2; if set 2, take next 2 or return list
  if (list.length <= 1) return list;
  const half = Math.ceil(list.length / 2);
  return setIndex === 1 ? list.slice(0, half) : list.slice(half);
}
