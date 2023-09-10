import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";
import { Exam } from "../model/exam";

type RequestParams = {
  courseId: string;
  examId: string;
};

export function useExamById({ courseId, examId }: RequestParams) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["exam"],
    queryFn: () =>
      teacherClient
        .get<Exam>(`/courses/${courseId}/${examId}/details`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
  });
}
