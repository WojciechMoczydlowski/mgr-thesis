import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { ClosedTask, Task } from "@/domain/student/papers/model/Task";
import {
  useDeleteClosedTaskMutation,
  usePutClosedTaskMutation,
} from "@/domain/store/teacher";

type Props = {
  task: ClosedTask;
  taskPoolId: string;
};

export default function ClosedTaskTile({ task, taskPoolId }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskId = task.id;

  const [deleteTask, { isLoading: isDeleteClosedTaskLoading }] =
    useDeleteClosedTaskMutation();
  const [editTask, { isLoading: isEditTaskLoading }] =
    usePutClosedTaskMutation();

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
          </Stack>
        </Flex>
        <Text fontSize="medium">{task.content}</Text>
      </Stack>
    </Box>
  );
}
