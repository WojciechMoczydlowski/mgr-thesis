import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useStudentClient } from "@/services/backend/useStudentClient";
import { useQuery } from "@tanstack/react-query";
import { Paper } from "../model/Paper";
import { Task } from "../model/Task";

type RequestParams = {
  courseId: string;
  paperId: string;
};

export function useStudentPaper({ courseId, paperId }: RequestParams) {
  const { token } = useCurrentToken();
  const studentClient = useStudentClient();

  return useQuery({
    queryKey: ["studentPaper", courseId, paperId],
    queryFn: () =>
      studentClient
        .get<Task[]>(`/courses/${courseId}/${paperId}`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(paperId),
  });
}
