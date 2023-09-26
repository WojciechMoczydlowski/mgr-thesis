import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { ClosedTask, Task } from "@/domain/student/papers/model/Task";

export default function ClosedTaskList() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const tasks: ClosedTask[] = [];
  const addClosedTask = () => {};
  const deleteTask = () => {};
  const editClosedTask = () => {};

  if (false) {
    return <InfoSpinner details="Ładowanie zadań" />;
  }

  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Pula zadań zamkniętych
          </Text>
          <Spacer />
          <AddClosedTaskModal
            addClosedTask={({ title, taskContent, penaltyWeight, answers }) =>
              addClosedTask()
            }
          />
        </Flex>

        {tasks?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak zadań w puli
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {tasks?.map((task) => {
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
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
