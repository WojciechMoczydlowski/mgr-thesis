import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useTaskPools({ courseId, examId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["taskPools", courseId, examId],
    queryFn: () =>
      teacherClient
        .get<TaskPool[]>(`/courses/${courseId}/${examId}`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
