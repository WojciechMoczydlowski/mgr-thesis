import { TaskCommon, TaskType } from "../../model";

export type OpenTaskSummary = {
  id: number;
  title: string;
  content: string;
};

export type OpenTask = {
  type: TaskType.OPEN;
  answer: string;
} & TaskCommon;
