import { Flex, Box, Text, Stack, IconButton, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { TaskPoolTypes } from "../const";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditTaskPoolModal from "./EditTaskPoolModal";
import { useAppDispatch } from "@/domain/store";
import {
  updateOpenTaskThunk,
  deleteTasksPoolThunk,
  TaskPool,
  unSelectTaskPool,
  selectTaskPool,
} from "@/domain/store/teacher";
import { useRunInTask } from "@/utils/index";

type Props = {
  taskPool: TaskPool;
  isSelected: boolean;
};

export default function TaskPoolTile({ taskPool, isSelected }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();
  const toast = useToast();

  const { runInTask: runUpdateTasksPoolTask } = useRunInTask({
    onError: () =>
      toast({
        status: "error",
        title: "Błąd podczas edycji puli zadań",
      }),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Pula zadań pomyślnie edytowana",
      });
    },
  });

  const { runInTask: runDeleteTasksPoolTask } = useRunInTask({
    onError: () =>
      toast({
        status: "error",
        title: "Błąd podczas usuwania puli zadań",
      }),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Pula zadań pomyślnie usunięta",
      });
    },
  });

  const onTileClick = () => {
    if (isSelected) {
      dispatch(unSelectTaskPool());
    } else {
      dispatch(selectTaskPool({ id: taskPool.id }));
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
                runUpdateTasksPoolTask(() =>
                  dispatch(
                    updateOpenTaskThunk({
                      courseId,
                      examId,
                      ...params,
                    })
                  )
                )
              }
            />
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                runDeleteTasksPoolTask(() =>
                  dispatch(
                    deleteTasksPoolThunk({
                      courseId,
                      examId,
                      tasksPoolId: taskPool.id,
                    })
                  )
                );
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
