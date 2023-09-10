import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useStudentClient } from "@/services/backend/useStudentClient";
import { useQuery } from "@tanstack/react-query";
import { ExamMarkingDetails } from "../model/ExamMarkingDetails";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useStudentExamMarkingDetails({
  courseId,
  examId,
}: RequestParams) {
  const { token } = useCurrentToken();
  const studentClient = useStudentClient();

  return useQuery({
    queryKey: ["markingExamDetails", courseId, examId],
    queryFn: () =>
      studentClient
        .get<ExamMarkingDetails>(
          `/courses/${courseId}/${examId}/marking_details`
        )
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
