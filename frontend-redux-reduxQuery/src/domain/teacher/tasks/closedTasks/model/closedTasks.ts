export type ClosedTaskSummary = {
  id: string;
  title: string;
  content: string;
  penaltyWeight: number;
  answers: ClosedTaskAnswerSummary[];
};

export type ClosedTaskAnswerSummary = {
  id: string;
  content: string;
  weight: number;
  isCorrect: boolean;
};
