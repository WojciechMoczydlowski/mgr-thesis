import { TaskType } from "@/domain/student/papers/model/Task";
import { TaskCommon } from "../tasks";

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
