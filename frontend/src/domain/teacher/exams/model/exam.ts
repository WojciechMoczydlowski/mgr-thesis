import { ExamStatus } from "@/domain/exam/model/ExamStatus";

export type Exam = {
  id: string;
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  duration: number;
  grade: number | null;
  overallPoints: number | null;
  status: ExamStatus;
};
