import { Flex, Box, Text, Stack, IconButton, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { useRunInTask } from "@/utils/useRunInTask";
import { useAppDispatch, useAppSelector } from "@/domain/store";
import {
  OpenTask,
  deleteOpenTaskThunk,
  moveOpenTaskThunk,
  selectIsOpenTaskSelectedChecker,
  updateOpenTaskThunk,
} from "@/domain/store/teacher";
import MoveTaskModal from "../../components/MoveTaskModal";
import {
  selectOpenTasksPools,
  selectSelectedTaskPool,
} from "@/domain/store/teacher/pools/selectors";
import {
  selectOpenTask,
  unselectOpenTask,
} from "@/domain/store/teacher/openTasks/slice";

type Props = {
  task: OpenTask;
};

export default function OpenTaskTile({ task }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();

  const selectedTaskPool = useAppSelector(selectSelectedTaskPool);
  const openTaskPools = useAppSelector(selectOpenTasksPools);
  const isTaskSelected = useAppSelector(selectIsOpenTaskSelectedChecker)(
    task.id
  );

  const { isRunning: isEditOpenTaskLoading, runInTask: runEditOpenTaskTask } =
    useRunInTask();

  const {
    isRunning: isDeleteOpenTaskLoading,
    runInTask: runDeleteOpenTaskTask,
  } = useRunInTask();

  const { isRunning: isMoveOpenTaskLoading, runInTask: runMoveOpenTaskTask } =
    useRunInTask();

  const onCheckTask = (isChecked: boolean) => {
    const taskId = task.id;

    if (isChecked) {
      dispatch(selectOpenTask({ taskId, taskPoolId }));
    } else {
      dispatch(unselectOpenTask({ taskId, taskPoolId }));
    }
  };

  if (!selectedTaskPool) {
    return <Text>Proszę wybrać pulę zadań</Text>;
  }

  const taskPoolId = selectedTaskPool.id;
  const destitaionTaskPools = openTaskPools.filter(
    (taskPool) => taskPool !== selectedTaskPool
  );

  return (
    <Box
      key={task.title}
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      p="2"
      my="1"
    >
      <Stack>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="medium" fontWeight="bold">
            {task.title}
          </Text>
          <Stack direction="row">
            <MoveTaskModal
              isLoading={isMoveOpenTaskLoading}
              sourceTaskPool={selectedTaskPool}
              destitaionTaskPools={destitaionTaskPools}
              moveTask={(params) =>
                runMoveOpenTaskTask(() =>
                  dispatch(
                    moveOpenTaskThunk({
                      courseId,
                      examId,
                      sourcePoolId: taskPoolId,
                      task,
                      ...params,
                    })
                  )
                )
              }
            />
            <EditOpenTaskModal
              openTask={task}
              isLoading={isEditOpenTaskLoading}
              editOpenTask={(params) =>
                runEditOpenTaskTask(() =>
                  dispatch(
                    updateOpenTaskThunk({
                      courseId,
                      examId,
                      taskPoolId,
                      taskId: task.id,
                      ...params,
                    })
                  )
                )
              }
            />
            <IconButton
              aria-label="delete"
              isLoading={isDeleteOpenTaskLoading}
              onClick={(e) => {
                e.stopPropagation();
                runDeleteOpenTaskTask(() =>
                  dispatch(
                    deleteOpenTaskThunk({
                      courseId,
                      examId,
                      taskPoolId,
                      taskId: task.id,
                    })
                  )
                );
              }}
              icon={<SmallCloseIcon />}
            />
            <Checkbox
              size="lg"
              isChecked={isTaskSelected}
              onChange={(e) => onCheckTask(e.target.checked)}
            />
          </Stack>
        </Flex>
        <Text fontSize="medium">{task.content}</Text>
      </Stack>
    </Box>
  );
}
