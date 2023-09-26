import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useStudentClient } from "@/services/backend/useStudentClient";
import { useQuery } from "@tanstack/react-query";
import { Exam } from "@/domain/teacher/exams/model/exam";

type RequestParams = {
  courseId: string;
};

export function useStudentExams({ courseId }: RequestParams) {
  const { token } = useCurrentToken();
  const studentClient = useStudentClient();

  return useQuery({
    queryKey: ["studentExams", courseId],
    queryFn: () =>
      studentClient.get<Exam[]>(`/courses/${courseId}`).then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId),
  });
}
