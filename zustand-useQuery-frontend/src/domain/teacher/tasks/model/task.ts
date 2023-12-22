export enum TaskType {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type TaskCommon = {
  id: string;
  taskPooldId: string;
  title: string;
  content: string;
  maxPoints: number;
  earnedPoints: null;
  penaltyWeight: number;
};
