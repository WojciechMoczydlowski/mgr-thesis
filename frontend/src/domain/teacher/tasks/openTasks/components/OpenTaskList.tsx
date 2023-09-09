import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { useOpenTasks } from "../endpoints/useOpenTasks";
import { useAddOpenTask } from "../endpoints/useAddOpenTask";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { useEditOpenTask } from "../endpoints/useEditOpenTask";

export default function OpenTaskList() {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const { mutate: deleteTask } = useDeleteTask({
    courseId,
    examId,
    taskPoolId,
  });

  const { data: tasks, isLoading: isTasksLoading } = useOpenTasks({
    courseId,
    examId,
    taskPoolId,
  });

  const { mutate: addOpenTask } = useAddOpenTask({
    courseId,
    examId,
    taskPoolId,
  });

  const { mutate: editOpenTask } = useEditOpenTask({
    courseId,
    examId,
    taskPoolId,
  });

  if (isTasksLoading) {
    return <InfoSpinner details="Ładowanie zadań" />;
  }

  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Pula zadań otwartych
          </Text>
          <Spacer />
          <AddTaskModal addOpenTask={(params) => addOpenTask(params)} />
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
                        <EditOpenTaskModal
                          openTask={task}
                          editOpenTask={(params) =>
                            editOpenTask({ ...params, taskId: task.id })
                          }
                        />
                        <IconButton
                          aria-label="delete"
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
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
