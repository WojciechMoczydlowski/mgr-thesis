export type Task = OpenTask | ClosedTask;

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

export type ClosedTask = {
  type: TaskType.CLOSED;
  answers: ClosedTaskAnswer[];
} & TaskCommon;

export type OpenTask = {
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
