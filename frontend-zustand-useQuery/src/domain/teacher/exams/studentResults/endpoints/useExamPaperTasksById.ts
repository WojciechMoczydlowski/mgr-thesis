import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";
import { ExamPaperTasks } from "../model/ExamPaperTasks";

type RequestParams = {
  courseId: string;
  examId: string;
  examPaperId: string;
};

export function useExamPaperTasksById({
  courseId,
  examId,
  examPaperId,
}: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["examPaperDetails", examPaperId],
    queryFn: () =>
      teacherClient
        .get<ExamPaperTasks>(
          `/courses/${courseId}/${examId}/exampapers/${examPaperId}`
        )
        .then((res) => res.data),
    enabled:
      Boolean(token) &&
      Boolean(courseId) &&
      Boolean(examId) &&
      Boolean(examPaperId),
  });
}
