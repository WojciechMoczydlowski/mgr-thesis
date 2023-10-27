import { TaskType } from "@/domain/student/papers/model/Task";

export type TaskPool = {
  id: string;
  title: string;
  taskType: TaskType;
  description: string;
  pointsPerTask: number;
  taskDrawNumber: number;
};
