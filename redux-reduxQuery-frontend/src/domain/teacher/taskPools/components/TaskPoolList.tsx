import {
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  IconButton,
  useEditable,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import AddTaskPoolModal from "./AddTaskPoolModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { TaskPoolTypes } from "../const";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditTaskPoolModal from "./EditTaskPoolModal";
import { useEffect } from "react";
import { useAppDispatch } from "@/domain/store";
import {
  fetchAllTasksPoolsThunk,
  updateTasksPoolThunk,
  addTasksPoolThunk,
  deleteTasksPoolThunk,
} from "@/domain/store/teacher";
import { useSelector } from "react-redux";
import { selectTasksPools } from "@/domain/store/teacher/pools/selectors";
import { useRunInTask } from "@/utils/index";

// toast({
//   status: "error",
//   title: "Wystąpił błąd podczas tworzenia puli zadań",
// });

export default function TaskPoolList() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();

  const toast = useToast();

  const { isError, isRunning, runInTask } = useRunInTask();
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

  const { runInTask: runAddTasksPoolTask } = useRunInTask({
    onError: () =>
      toast({
        status: "error",
        title: "Błąd podczas tworzenia puli zadań",
      }),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Pula zadań pomyślnie utworzona",
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

  useEffect(() => {
    runInTask(() => dispatch(fetchAllTasksPoolsThunk({ courseId, examId })));
  }, [courseId, examId, dispatch, runInTask]);

  const taskPools = useSelector(selectTasksPools);

  const deleteTaskPool = () => {};

  if (isRunning) {
    return <InfoSpinner details="Ładowanie pul zadań" />;
  }

  if (isError) {
    return <div>Wystąpił błąd podczas ładowanie pól zadań</div>;
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
            addTaskPool={(params) =>
              runAddTasksPoolTask(() =>
                dispatch(addTasksPoolThunk({ examId, courseId, ...params }))
              )
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
                            runUpdateTasksPoolTask(() =>
                              dispatch(
                                updateTasksPoolThunk({
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
