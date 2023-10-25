import { useCurrentToken } from "@/services/auth/hooks/useCurrentToken";
import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { useQuery } from "@tanstack/react-query";
import { TaskType } from "../../tasks/model";

type RequestParams<T> = {
  courseId: string;
  examId: string;
  select?: (data: TaskPool[]) => T;
};

export function useTaskPools<T = TaskPool[]>({
  courseId,
  examId,
  select,
}: RequestParams<T>) {
  const { token } = useCurrentToken();
  const teacherClient = useTeacherClient();

  return useQuery<TaskPool[], Error, T>({
    queryKey: ["taskPools", courseId, examId],
    queryFn: () =>
      teacherClient
        .get<TaskPool[]>(`/courses/${courseId}/${examId}`)
        .then((res) => res.data),
    enabled: Boolean(token) && Boolean(courseId) && Boolean(examId),
    select,
  });
}

export const useClosedTaskPools = (params: {
  courseId: string;
  examId: string;
}) =>
  useTaskPools<TaskPool[]>({
    ...params,
    select: (data) => data.filter((item) => item.taskType === TaskType.CLOSED),
  });

export const useOpenTaskPools = (params: {
  courseId: string;
  examId: string;
}) =>
  useTaskPools<TaskPool[]>({
    ...params,
    select: (data) => data.filter((item) => item.taskType === TaskType.OPEN),
  });

export const useTaskPoolById = ({
  taskPoolId,
  ...params
}: {
  courseId: string;
  examId: string;
  taskPoolId: string;
}) =>
  useTaskPools({
    ...params,
    select: (data) => data.find((item) => item.id === taskPoolId),
  });
