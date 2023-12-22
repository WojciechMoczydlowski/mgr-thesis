export type Task = StudentOpenTask | StudentClosedTask;

export enum TaskType {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

type TaskCommon = {
  id: string;
  title: string;
  content: string;
  maxPoints: number;
  earnedPoints: null;
  penaltyWeight: number;
};

export type StudentClosedTask = {
  type: TaskType.CLOSED;
  answers: ClosedTaskAnswer[];
} & TaskCommon;

export type StudentOpenTask = {
  type: TaskType.OPEN;
  answer: string;
} & TaskCommon;

export type ClosedTaskAnswer = {
  id: number;
  content: string;
  weight: number;
  isCorrect: boolean;
  isMarked: boolean;
};
