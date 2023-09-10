import { ExamStatus } from "@/domain/exam/model/ExamStatus";

export type ExamDetails = {
  id: string;
  dateTimeEnd: string;
  dateTimeStart: string;
  description: string;
  duration: number;
  grade: number | null;
  overallPoints: number | null;
  title: string;
  status: ExamStatus;
};
