import { TaskCommon, TaskType } from "../tasks";

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
