import { useAppDispatch } from "@/domain/store";
import {
  selectTaskPool,
  unSelectTaskPool,
  useDeleteClosedTaskMutation,
  usePostClosedTaskMutation,
} from "@/domain/store/teacher";
import { ClosedTask } from "@/domain/store/teacher/closedTasks";

export const useMoveClosedTask = ({
  courseId,
  examId,
  sourceTaskPoolId,
  task,
}: {
  courseId: string;
  examId: string;
  sourceTaskPoolId: string;
  task: ClosedTask;
}) => {
  const dispatch = useAppDispatch();

  const [postClosedTask, { isLoading: isPostClosedTaskLoading }] =
    usePostClosedTaskMutation();
  const [deleteClosedTask, { isLoading: isDeleteClosedTaskLoading }] =
    useDeleteClosedTaskMutation();

  const moveClosedTask = async ({
    destinationTaskPoolId,
  }: {
    destinationTaskPoolId: string;
  }) => {
    try {
      dispatch(unSelectTaskPool());

      await postClosedTask({
        examId,
        courseId,
        taskPoolId: destinationTaskPoolId,
        payload: { ...task },
      }).unwrap();
      await deleteClosedTask({
        examId,
        courseId,
        taskPoolId: sourceTaskPoolId,
        taskId: task.id,
      }).unwrap();

      dispatch(
        selectTaskPool({
          id: Number(destinationTaskPoolId) as unknown as string,
        })
      );
    } catch {}
  };

  return {
    moveClosedTask,
    isLoading: isPostClosedTaskLoading || isDeleteClosedTaskLoading,
  };
};
