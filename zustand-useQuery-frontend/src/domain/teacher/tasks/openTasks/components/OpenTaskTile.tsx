import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";

import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useEditOpenTask } from "../endPoints/useEditOpenTask";

type Props = {
  task: OpenTask;
  taskPoolId: string;
};

export default function OpenTaskTile({ task, taskPoolId }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

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
