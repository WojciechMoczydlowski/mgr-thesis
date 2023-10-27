import {
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { Task } from "@/domain/student/papers/model/Task";
import {
  useDeleteClosedTaskMutation,
  usePutClosedTaskMutation,
} from "@/domain/store/teacher";
import MoveTaskModal from "../../components/MoveTaskModal";
import { useAppDispatch, useAppSelector } from "@/domain/store";
import {
  selectClosedTasksPools,
  selectSelectedTaskPool,
} from "@/domain/store/teacher/pools/selectors";
import { useMoveClosedTask } from "../utils";
import { selectIsClosedTaskSelectedChecker } from "@/domain/store/teacher/closedTasks/selectors";
import { ClosedTask } from "@/domain/store/teacher/closedTasks";
import {
  selectClosedTask,
  unselectClosedTask,
} from "@/domain/store/teacher/closedTasks/slice";

type Props = {
  task: ClosedTask;
};

export default function ClosedTaskTile({ task }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskId = task.id;

  const dispatch = useAppDispatch();

  const selectedTaskPool = useAppSelector(selectSelectedTaskPool);
  const closedTaskPools = useAppSelector(selectClosedTasksPools);
  const isTaskSelected = useAppSelector(selectIsClosedTaskSelectedChecker)(
    task.id
  );

  const [deleteTask, { isLoading: isDeleteClosedTaskLoading }] =
    useDeleteClosedTaskMutation();
  const [editTask, { isLoading: isEditTaskLoading }] =
    usePutClosedTaskMutation();

  const { isLoading: isMoveClosedTaskLoading, moveClosedTask } =
    useMoveClosedTask({
      courseId,
      examId,
      sourceTaskPoolId: selectedTaskPool?.id!,
      task,
    });

  const onCheckTask = (isChecked: boolean) => {
    const taskId = task.id;

    if (isChecked) {
      dispatch(selectClosedTask({ taskId, taskPoolId }));
    } else {
      dispatch(unselectClosedTask({ taskId, taskPoolId }));
    }
  };

  if (!selectedTaskPool) {
    return <Text>Proszę wybrać pulę zadań</Text>;
  }

  const taskPoolId = selectedTaskPool.id;
  const destitaionTaskPools = closedTaskPools.filter(
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
              sourceTaskPool={selectedTaskPool}
              destitaionTaskPools={destitaionTaskPools}
              isLoading={isMoveClosedTaskLoading}
              moveTask={moveClosedTask}
            />
            <EditClosedTaskModal
              isLoading={isEditTaskLoading}
              closedTask={task}
              editClosedTask={(payload) =>
                editTask({ courseId, examId, taskPoolId, taskId, payload })
              }
            />
            <IconButton
              isLoading={isDeleteClosedTaskLoading}
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask({ courseId, examId, taskPoolId, taskId });
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
