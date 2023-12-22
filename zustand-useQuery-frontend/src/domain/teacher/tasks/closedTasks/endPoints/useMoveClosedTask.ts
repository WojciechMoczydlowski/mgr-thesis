import { useTaskPoolStore } from "@/domain/teacher/taskPools/store/taskPoolStore";
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useAddClosedTask } from "./useAddClosedTask";
import { ClosedTask } from "../model/closedTasks";
import { useClosedTasksStore } from "../store/closedTasksStore";

export const useMoveClosedTask = ({
  courseId,
  examId,
  sourcePoolId,
}: {
  courseId: string;
  examId: string;
  sourcePoolId: string;
}) => {
  const { selectTaskPool } = useTaskPoolStore();
  const { unselectedAllTasks } = useClosedTasksStore();

  const {
    mutateAsync: addClosedTask,
    isLoading: isAddClosedTaskLoading,
    isError: isAddClosedTaskError,
  } = useAddClosedTask({
    courseId,
    examId,
  });

  const {
    mutateAsync: deleteClosedTask,
    isLoading: isDeleteClosedTaskLoading,
    isError: isDeleteClosedTaskError,
  } = useDeleteTask({
    courseId,
    examId,
    taskPoolId: sourcePoolId,
  });

  const moveClosedTask = async ({
    task,
    destinationTaskPoolId,
  }: {
    task: ClosedTask;
    destinationTaskPoolId: string;
  }) => {
    await Promise.all([
      addClosedTask({ ...task, taskPoolIdFallback: destinationTaskPoolId }),
      deleteClosedTask({ taskId: task.id }),
    ]);

    selectTaskPool({ id: destinationTaskPoolId });
    unselectedAllTasks();
  };

  return {
    isError: isAddClosedTaskError && isDeleteClosedTaskError,
    isLoading: isAddClosedTaskLoading && isDeleteClosedTaskLoading,
    moveClosedTask,
  };
};
