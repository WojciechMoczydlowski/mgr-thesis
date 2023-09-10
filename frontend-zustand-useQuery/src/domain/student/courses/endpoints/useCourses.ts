import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useStudentClient } from "@/services/backend/useStudentClient";
import { useQuery } from "@tanstack/react-query";

export function useStudentCourses() {
  const { token } = useCurrentToken();
  const teacherClient = useStudentClient();

  return useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      teacherClient.get<Course[]>("/courses").then((res) => res.data),
    enabled: Boolean(token),
  });
}
