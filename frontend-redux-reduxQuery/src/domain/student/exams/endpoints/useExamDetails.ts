import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useStudentClient } from "@/services/backend/useStudentClient";
import { useQuery } from "@tanstack/react-query";
import { ExamDetails } from "../model/ExamDetails";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useStudentExamDetails({ courseId, examId }: RequestParams) {
  const { token } = useCurrentToken();
  const studentClient = useStudentClient();

  return useQuery({
    queryKey: ["examDetails", courseId, examId],
    queryFn: () =>
      studentClient
        .get<ExamDetails>(`/courses/${courseId}/${examId}/details`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
