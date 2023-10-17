export type PostExamPayload = {
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  duration: number;
};

export type PutExamPayload = {
  title: string;
  description: string;
  dateTimeStart: string;
  dateTimeEnd: string;
  duration: number;
};

export type ClosedTasksRequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export type PostClosedTaskPayload = {
  title: string;
  content: string;
  penaltyWeight: number;
  answers: {
    content: string;
    weight: number;
    isCorrect: boolean;
  }[];
};

export type PutClosedTaskPayload = {
  taskId: string;
  title: string;
  content: string;
  penaltyWeight: number;
  answers: {
    content: string;
    weight: number;
    isCorrect: boolean;
  }[];
};
