import { TaskType } from "@/domain/student/papers/model/Task";
import { TaskCommon } from "../tasks";

export type OpenTaskThunkCommon = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export type OpenTask = {
  type: TaskType.OPEN;
  answer: string;
} & TaskCommon;
