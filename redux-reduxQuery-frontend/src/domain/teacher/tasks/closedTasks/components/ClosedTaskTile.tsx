import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { ClosedTask, Task } from "@/domain/student/papers/model/Task";

type Props = {
  task: ClosedTask;
};

export default function ClosedTaskTile({ task }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const deleteTask = () => {};
  const editClosedTask = () => {};

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
            <EditClosedTaskModal
              closedTask={task}
              editClosedTask={(params) => editClosedTask()}
            />
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask();
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
