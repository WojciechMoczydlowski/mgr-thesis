import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";

export function useTeacherCourses() {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      teacherClient.get<Course[]>("/courses").then((res) => res.data),
    enabled: Boolean(token),
  });
}
