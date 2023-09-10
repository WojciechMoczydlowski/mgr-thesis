import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useStatistics({ courseId, examId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["statistics", courseId, examId],
    queryFn: () =>
      teacherClient
        .get<Statistics>(`/courses/${courseId}/${examId}/statistics`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
