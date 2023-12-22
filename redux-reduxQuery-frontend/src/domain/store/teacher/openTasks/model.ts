import { TaskCommon, TaskType } from "../tasks";

export type OpenTaskThunkCommon = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export type OpenTask = {
  type: TaskType.OPEN;
  answer: string;
} & TaskCommon;
