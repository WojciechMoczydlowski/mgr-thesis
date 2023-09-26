import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useExamPapers({ courseId, examId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["examPaper", courseId, examId],
    queryFn: () =>
      teacherClient
        .get<ExamPaper[]>(`/courses/${courseId}/${examId}/exampapers`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
