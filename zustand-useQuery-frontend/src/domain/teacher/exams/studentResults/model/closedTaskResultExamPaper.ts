import { TaskType } from "@/domain/teacher/tasks/model";

export type ClosedTaskResultExamPaper = {
  id: string;
  type: TaskType.CLOSED;
  title: string;
  content: string;
  maxPoints: string;
  earnedPoints: string | null;
  teacherComment: string;
  answer: string;
  penaltyWeight: string | null;
  minPoints: string | null;
  answersExamPaper: ClosedTaskAnswerResult[];
};

type ClosedTaskAnswerResult = {
  id: string;
  content: string;
  weight: string;
  isCorrect: boolean;
  isMarked: boolean;
};
