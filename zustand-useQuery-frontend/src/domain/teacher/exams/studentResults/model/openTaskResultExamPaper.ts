import { TaskType } from "@/domain/teacher/tasks/model";

export type OpenTaskResultExamPaper = {
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
