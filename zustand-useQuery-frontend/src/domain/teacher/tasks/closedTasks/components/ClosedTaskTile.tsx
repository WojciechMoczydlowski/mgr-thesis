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
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useEditClosedTask } from "../endpoints/useEditClosedTask";
import MoveTaskModal from "../../components/MoveTaskModal";
import { useMoveClosedTask } from "../endpoints/useMoveClosedTask";
import {
  useClosedTaskPools,
  useTaskPoolById,
} from "@/domain/teacher/taskPools/endpoints/useTaskPools";
import { ClosedTask } from "../model/closedTasks";
import {
  useClosedTasksStore,
  useIsClosedTaskSelected,
} from "../store/closedTasksStore";

type Props = {
  task: ClosedTask;
  taskPoolId: string;
};

export default function ClosedTaskTile({ task, taskPoolId }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskId = task.id;

  const { data: closedTaskPools } = useClosedTaskPools({ courseId, examId });
  const { data: taskPool } = useTaskPoolById({ courseId, examId, taskPoolId });

  const destitaionTaskPools =
    closedTaskPools?.filter((t) => t.id !== taskPool?.id) ?? [];

  const { mutate: deleteTask, isLoading: isDeleteClosedTaskLoading } =
    useDeleteTask({
      courseId,
      examId,
      taskPoolId,
    });

  const { mutate: editClosedTask, isLoading: isEditClosedTaskLoading } =
    useEditClosedTask({
      courseId,
      examId,
      taskPoolId,
    });

  const { moveClosedTask, isLoading: isMoveClosedTaskLoading } =
    useMoveClosedTask({
      courseId,
      examId,
      sourcePoolId: taskPoolId,
    });

  const isTaskSelected = useIsClosedTaskSelected({
    taskId: task.id,
    taskPoolId,
  });

  const closedTasksStore = useClosedTasksStore();

  const onCheckTask = (checked: boolean) => {
    if (checked) {
      closedTasksStore.selectTask({ taskId, taskPoolId });
    } else {
      closedTasksStore.unselectTask({ taskId, taskPoolId });
    }
  };

  if (!closedTaskPools || !taskPool) {
    return <Text>Błąd podczas ładowanie strony</Text>;
  }

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
              isLoading={false}
              destitaionTaskPools={destitaionTaskPools}
              moveClosedTask={({ destinationTaskPoolId }) =>
                moveClosedTask({ task, destinationTaskPoolId })
              }
              sourceTaskPool={taskPool}
            />
            <EditClosedTaskModal
              isLoading={isEditClosedTaskLoading}
              closedTask={task}
              editClosedTask={(payload) => editClosedTask(payload)}
            />
            <IconButton
              isLoading={isDeleteClosedTaskLoading}
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask({ taskId });
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
