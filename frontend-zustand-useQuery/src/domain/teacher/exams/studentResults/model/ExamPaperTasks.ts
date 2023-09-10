import { ClosedTaskResultExamPaper } from "./closedTaskResultExamPaper";
import { OpenTaskResultExamPaper } from "./openTaskResultExamPaper";

export type ExamPaperTasks = (
  | ClosedTaskResultExamPaper
  | OpenTaskResultExamPaper
)[];
