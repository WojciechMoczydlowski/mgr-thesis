import { Flex, Box, Text, Stack, IconButton, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { TaskPoolTypes } from "../const";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditTaskPoolModal from "./EditTaskPoolModal";
import { useDeleteTaskPool } from "../endpoints/useDeleteTaskPool";
import { useEditTaskPool } from "../endpoints/useEditTaskPool";
import { useTaskPoolById } from "../endpoints/useTaskPoolById";
import { useTaskPoolStore } from "../store/taskPoolStore";

type Props = {
  taskPool: TaskPool;
  isSelected: boolean;
};

export default function TaskPoolTile({ taskPool, isSelected }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { mutate: deleteTaskPool } = useDeleteTaskPool({ courseId, examId });
  const { mutate: editTaskPool } = useEditTaskPool({ courseId, examId });

  const { selectTaskPool, unSelectTaskPool } = useTaskPoolStore();

  const onTileClick = () => {
    if (isSelected) {
      unSelectTaskPool();
    } else {
      selectTaskPool({ id: taskPool.id });
    }
  };

  return (
    <Box
      cursor="pointer"
      onClick={onTileClick}
      key={taskPool.title}
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      p="2"
      my="1"
      backgroundColor={isSelected ? "gray.50" : "inherit"}
    >
      <Stack>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="medium" fontWeight="bold">
            {taskPool.title}
          </Text>
          <Stack direction="row">
            <EditTaskPoolModal
              taskPool={taskPool}
              editTaskPool={(params) =>
                editTaskPool({ ...params, taskPoolId: taskPool.id })
              }
            />
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTaskPool({ taskPoolId: taskPool.id });
              }}
              icon={<SmallCloseIcon />}
            />
          </Stack>
        </Flex>

        <Text fontSize="medium">{taskPool.description}</Text>
        <Text fontSize="small">
          {`Typ zadań: ${
            taskPool.taskType === TaskPoolTypes.open ? "otwarte" : "zamknięte"
          }`}
        </Text>
        <Text fontSize="small">
          Liczba punktów za zadanie: {taskPool.pointsPerTask}
        </Text>
        <Text fontSize="small">
          Liczba losowanych zadań: {taskPool.taskDrawNumber}
        </Text>
      </Stack>
    </Box>
  );
}
