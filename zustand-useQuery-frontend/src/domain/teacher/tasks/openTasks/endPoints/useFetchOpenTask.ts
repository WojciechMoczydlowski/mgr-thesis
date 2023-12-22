import { useTeacherClient } from "@/services/backend/useTeacherClient";
import { OpenTask } from "../model/openTask";

type Common = {
  courseId: string;
  examId: string;
  taskPoolId: string;
};

export function useFetchOpenTasks() {
  const teacherClient = useTeacherClient();

  const fetchClosedTask = async ({
    courseId,
    examId,
    taskPoolId,
    taskId,
  }: Common & {
    taskId: string;
  }) => {
    return teacherClient
      .get<OpenTask>(`/courses/${courseId}/${examId}/${taskPoolId}/${taskId}`)
      .then((res) => res.data);
  };

  const fetchClosedTasks = async ({
    taskIds,
    ...params
  }: Common & {
    taskIds: string[];
  }) => {
    try {
      return Promise.all(
        taskIds.map((taskId) => fetchClosedTask({ taskId, ...params }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return fetchClosedTasks;
}
