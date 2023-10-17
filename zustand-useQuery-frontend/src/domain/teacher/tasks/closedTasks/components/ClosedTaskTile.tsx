import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { ClosedTask, Task } from "@/domain/student/papers/model/Task";
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useEditClosedTask } from "../endpoints/useEditClosedTask";

type Props = {
  task: ClosedTask;
  taskPoolId: string;
};

export default function ClosedTaskTile({ task, taskPoolId }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskId = task.id;

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
          </Stack>
        </Flex>
        <Text fontSize="medium">{task.content}</Text>
      </Stack>
    </Box>
  );
}
