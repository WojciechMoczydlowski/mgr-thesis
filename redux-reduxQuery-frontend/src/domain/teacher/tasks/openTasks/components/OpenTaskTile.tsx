import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";

type Props = {
  task: OpenTask;
};

export default function OpenTaskTile({ task }: Props) {
  const deleteTask = () => {};
  const editOpenTask = () => {};

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
              editOpenTask={(params) => editOpenTask()}
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
