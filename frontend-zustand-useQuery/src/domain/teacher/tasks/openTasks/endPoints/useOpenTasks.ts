import { OpenTask } from "@/domain/student/papers/model/Task";
import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export function useOpenTasks({ courseId, examId, taskPoolId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["openTasks", courseId, examId, taskPoolId],
    queryFn: () =>
      teacherClient
        .get<OpenTask[]>(`/courses/${courseId}/${examId}/${taskPoolId}`)
        .then((res) => res.data),
    enabled:
      Boolean(token) &&
      Boolean(courseId) &&
      Boolean(examId) &&
      Boolean(taskPoolId),
  });
}
