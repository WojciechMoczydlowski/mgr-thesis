import { TaskCommon, TaskType } from "../../model";

export type ClosedTaskSummary = {
  id: string;
  title: string;
  content: string;
  penaltyWeight: number;
  answers: ClosedTaskAnswerSummary[];
};

export type ClosedTaskAnswerSummary = {
  id: string;
  content: string;
  weight: number;
  isCorrect: boolean;
};

export type ClosedTask = {
  type: TaskType.CLOSED;
  answers: ClosedTaskAnswer[];
} & TaskCommon;

export type ClosedTaskAnswer = {
  id: number;
  content: string;
  weight: number;
  isCorrect: boolean;
  isMarked: boolean;
};
