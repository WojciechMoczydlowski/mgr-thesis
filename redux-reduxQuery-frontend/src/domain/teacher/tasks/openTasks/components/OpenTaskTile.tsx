import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";
import { useRunInTask } from "@/utils/useRunInTask";
import { useAppDispatch } from "@/domain/store";
import {
  deleteOpenTaskThunk,
  updateOpenTaskThunk,
} from "@/domain/store/teacher";

type Props = {
  task: OpenTask;
  taskPoolId: string;
};

export default function OpenTaskTile({ task, taskPoolId }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();

  const { isRunning: isEditOpenTaskLoading, runInTask: runEditOpenTaskTask } =
    useRunInTask();

  const {
    isRunning: isDeleteOpenTaskLoading,
    runInTask: runDeleteOpenTaskTask,
  } = useRunInTask();

  if (false) {
    return <InfoSpinner details="Ładowanie zadań" />;
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
          </Stack>
        </Flex>
        <Text fontSize="medium">{task.content}</Text>
      </Stack>
    </Box>
  );
}
