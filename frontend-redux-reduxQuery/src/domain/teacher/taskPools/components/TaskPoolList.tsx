import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { useTaskPools } from "../endpoints/useTaskPools";
import { useAddTaskPool } from "../endpoints/useAddTaskPool";
import AddTaskPoolModal from "./AddTaskPoolModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { TaskPoolTypes } from "../const";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useDeleteTaskPool } from "../endpoints/useDeleteTaskPool";
import { useEditTaskPool } from "../endpoints/useEditTaskPool";
import EditTaskPoolModal from "./EditTaskPoolModal";

export default function TaskPoolList() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { data: taskPools, isLoading: isTaskPoolsLoading } = useTaskPools({
    courseId,
    examId,
  });

  const { mutate: addTaskPool } = useAddTaskPool({ courseId, examId });
  const { mutate: deleteTaskPool } = useDeleteTaskPool({ courseId, examId });
  const { mutate: editTaskPool } = useEditTaskPool({ courseId, examId });

  if (isTaskPoolsLoading) {
    return <InfoSpinner details="Ładowanie pul zadań" />;
  }

  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Pule zadań
          </Text>
          <Spacer />
          <AddTaskPoolModal
            addTaskPool={({
              title,
              taskType,
              description,
              pointsPerTask,
              taskDrawNumber,
            }) =>
              addTaskPool({
                title,
                taskType,
                description,
                pointsPerTask,
                taskDrawNumber,
              })
            }
          />
        </Flex>

        {taskPools?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak pul zadań
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {taskPools?.map((taskPool) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.teacher.courses.exams.taskPools.details.make({
                        courseId,
                        examId,
                        taskPoolId: taskPool.id,
                      })
                    )
                  }
                  key={taskPool.title}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
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
                      Typ zadań:{" "}
                      {taskPool.taskType === TaskPoolTypes.open
                        ? "otwarte"
                        : "zamknięte"}
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
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
