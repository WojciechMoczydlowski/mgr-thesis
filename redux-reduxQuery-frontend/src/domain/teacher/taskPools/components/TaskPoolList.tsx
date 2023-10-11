import { Flex, Text, Spacer, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  TaskPool,
} from "@/domain/store/teacher";
import { useSelector } from "react-redux";
import {
  selectSelectedTaskPool,
  selectTasksPools,
} from "@/domain/store/teacher/pools/selectors";
import { useRunInTask } from "@/utils/index";
import TaskPoolTile from "./TaskPoolTile";

export default function TaskPoolList() {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();
  const toast = useToast();

  const taskPools = useSelector(selectTasksPools);
  const selectedTaskPool = useSelector(selectSelectedTaskPool);

  const {
    isError,
    isRunning: isTaskPoolsLoading,
    runInTask: runFetchTasksPoolsTask,
  } = useRunInTask();

  useEffect(() => {
    runFetchTasksPoolsTask(() =>
      dispatch(fetchAllTasksPoolsThunk({ courseId, examId }))
    );
  }, [courseId, examId, dispatch, runFetchTasksPoolsTask]);

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

  if (isTaskPoolsLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Flex direction="row" justifyContent="space-between" flexGrow="1">
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
          <EmptyList />
        ) : (
          <List
            taskPools={taskPools}
            selectedTaskPoolId={selectedTaskPool?.id}
          />
        )}
      </Flex>
    </Flex>
  );
}

function EmptyList() {
  return (
    <Text my="4" color="red.500">
      Brak pul zadań
    </Text>
  );
}

function List({
  taskPools,
  selectedTaskPoolId,
}: {
  taskPools: TaskPool[];
  selectedTaskPoolId?: string;
}) {
  return (
    <Flex direction="column" my="4">
      {taskPools?.map((taskPool) => {
        return (
          <TaskPoolTile
            key={taskPool.id}
            taskPool={taskPool}
            isSelected={taskPool.id === selectedTaskPoolId}
          />
        );
      })}
    </Flex>
  );
}

function Loader() {
  return <InfoSpinner details="Ładowanie pul zadań" />;
}

function Error() {
  return <div>Wystąpił błąd podczas ładowanie pól zadań</div>;
}
