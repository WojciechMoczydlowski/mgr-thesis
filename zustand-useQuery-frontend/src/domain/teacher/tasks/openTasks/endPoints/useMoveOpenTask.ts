import { useTaskPoolStore } from "@/domain/teacher/taskPools/store/taskPoolStore";
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { OpenTask } from "../model/openTask";
import { useAddOpenTask } from "./useAddOpenTask";
import { useOpenTasksStore } from "../store/openTasksStore";

export const useMoveOpenTask = ({
  courseId,
  examId,
  sourcePoolId,
}: {
  courseId: string;
  examId: string;
  sourcePoolId: string;
}) => {
  const { selectTaskPool } = useTaskPoolStore();
  const { unselectedAllTasks } = useOpenTasksStore();

  const {
    mutateAsync: addOpenTask,
    isLoading: isAddOpenTaskLoading,
    isError: isAddOpenTaskError,
  } = useAddOpenTask({
    courseId,
    examId,
  });

  const {
    mutateAsync: deleteOpenTask,
    isLoading: isDeleteOpenTaskLoading,
    isError: isDeleteOpenTaskError,
  } = useDeleteTask({
    courseId,
    examId,
    taskPoolId: sourcePoolId,
  });

  const moveOpenTask = async ({
    task,
    destinationTaskPoolId,
  }: {
    task: OpenTask;
    destinationTaskPoolId: string;
  }) => {
    await Promise.all([
      addOpenTask({ ...task, taskPoolIdFallback: destinationTaskPoolId }),
      deleteOpenTask({ taskId: task.id }),
    ]);

    selectTaskPool({ id: destinationTaskPoolId });
    unselectedAllTasks();
  };

  return {
    isError: isAddOpenTaskError && isDeleteOpenTaskError,
    isLoading: isAddOpenTaskLoading && isDeleteOpenTaskLoading,
    moveOpenTask,
  };
};
