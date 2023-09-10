import { TaskType } from "../../papers/model/Task";

type ClosedTaskMarkingDetails = {
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

type OpenTaskMarkingDetails = {
  id: string;
  type: TaskType.OPEN;
  title: string;
  content: string;
  maxPoints: string;
  earnedPoints: string;
  teacherComment: string;
  answer: string;
  penaltyWeight: string | null;
  minPoints: string | null;
  answersExamPaper: string | null;
  fileName: string | null;
  fileFormat: string | null;
  data: string | null;
  fileStatus: string | null;
};

export type ExamMarkingDetails = (
  | ClosedTaskMarkingDetails
  | OpenTaskMarkingDetails
)[];
