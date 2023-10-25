import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";

import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useEditOpenTask } from "../endpoints/useEditOpenTask";
import MoveTaskModal from "../../components/MoveTaskModal";
import {
  useOpenTaskPools,
  useTaskPoolById,
} from "@/domain/teacher/taskPools/endpoints/useTaskPools";
import { useMoveOpenTask } from "../endpoints/useMoveOpenTask";

type Props = {
  task: OpenTask;
  taskPoolId: string;
};

export default function OpenTaskTile({ task, taskPoolId }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { data: openTaskPools } = useOpenTaskPools({ courseId, examId });
  const { data: taskPool } = useTaskPoolById({ courseId, examId, taskPoolId });

  const destitaionTaskPools =
    openTaskPools?.filter((t) => t.id !== taskPool?.id) ?? [];

  const { mutate: deleteTask, isLoading: isDeleteOpenTaskLoading } =
    useDeleteTask({
      courseId,
      examId,
      taskPoolId,
    });

  const { mutate: editOpenTask, isLoading: isEditOpenTaskLoading } =
    useEditOpenTask({
      courseId,
      examId,
      taskPoolId,
    });

  const { moveOpenTask, isLoading: isMoveOpenTaskLoading } = useMoveOpenTask({
    courseId,
    examId,
    sourcePoolId: taskPoolId,
  });

  if (!openTaskPools || !taskPool) {
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
                moveOpenTask({ task, destinationTaskPoolId })
              }
              sourceTaskPool={taskPool}
            />
            <EditOpenTaskModal
              openTask={task}
              isLoading={isEditOpenTaskLoading}
              editOpenTask={(params) =>
                editOpenTask({ ...params, taskId: task.id })
              }
            />
            <IconButton
              aria-label="delete"
              isLoading={isDeleteOpenTaskLoading}
              onClick={(e) => {
                e.stopPropagation();
                deleteTask({ taskId: task.id });
              }}
              icon={<SmallCloseIcon />}
            />
          </Stack>
        </Flex>
        <Text fontSize="medium">{task.content}</Text>
      </Stack>
    </Box>
  );
}
