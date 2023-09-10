import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";
import { Exam } from "../model/exam";

type RequestParams = {
  courseId: string;
};

export function useExams({ courseId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["exams", courseId],
    queryFn: () =>
      teacherClient.get<Exam[]>(`/courses/${courseId}`).then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId),
  });
}
