import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export function useTaskPoolById({
  courseId,
  examId,
  taskPoolId,
}: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["taskPool", taskPoolId],
    queryFn: () =>
      teacherClient
        .get<TaskPool>(`/courses/${courseId}/${examId}/${taskPoolId}/details`)
        .then((res) => res.data),
    enabled:
      Boolean(token) &&
      Boolean(courseId) &&
      Boolean(examId) &&
      Boolean(taskPoolId),
  });
}
