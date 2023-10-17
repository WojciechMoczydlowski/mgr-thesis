import { Flex, Text, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTaskPools } from "../endpoints/useTaskPools";
import { useAddTaskPool } from "../endpoints/useAddTaskPool";
import AddTaskPoolModal from "./AddTaskPoolModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { useDeleteTaskPool } from "../endpoints/useDeleteTaskPool";
import { useEditTaskPool } from "../endpoints/useEditTaskPool";
import { TaskType } from "@/domain/student/papers/model/Task";
import TaskPoolTile from "./TaskPoolTile";
import { useTaskPoolStore } from "../store/taskPoolStore";

type Props = {
  taskPools?: TaskPool[];
  isLoading: boolean;
  isError: boolean;
};

export default function TaskPoolList({ taskPools, isLoading, isError }: Props) {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { mutate: addTaskPool } = useAddTaskPool({ courseId, examId });

  const { selectedTaskPoolId } = useTaskPoolStore();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const openTasksPools =
    taskPools?.filter((taskPool) => taskPool.taskType === TaskType.OPEN) ?? [];

  const closedTasksPools =
    taskPools?.filter((taskPool) => taskPool.taskType === TaskType.CLOSED) ??
    [];

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      flexGrow="1"
      flexBasis="1"
    >
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Pule zadań
          </Text>
          <Spacer />
          <AddTaskPoolModal addTaskPool={(params) => addTaskPool(params)} />
        </Flex>

        <Flex direction="column">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Otwarte pule zadań
          </Text>

          {openTasksPools?.length === 0 ? (
            <EmptyList />
          ) : (
            <List
              taskPools={openTasksPools}
              selectedTaskPoolId={selectedTaskPoolId}
            />
          )}
        </Flex>

        <Flex direction="column">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Zamknięte pule zadań
          </Text>

          {closedTasksPools?.length === 0 ? (
            <EmptyList />
          ) : (
            <List
              taskPools={closedTasksPools}
              selectedTaskPoolId={selectedTaskPoolId}
            />
          )}
        </Flex>
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
