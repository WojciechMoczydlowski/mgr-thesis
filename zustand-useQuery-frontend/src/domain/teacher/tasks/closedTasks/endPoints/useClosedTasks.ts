import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";
import { ClosedTask } from "../model/closedTasks";

type RequestParams = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export function useClosedTasks({
  courseId,
  examId,
  taskPoolId,
}: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["closedTasks", courseId, examId, taskPoolId],
    queryFn: () =>
      teacherClient
        .get<ClosedTask[]>(`/courses/${courseId}/${examId}/${taskPoolId}`)
        .then((res) => res.data),
    enabled:
      Boolean(token) &&
      Boolean(courseId) &&
      Boolean(examId) &&
      Boolean(taskPoolId),
  });
}
