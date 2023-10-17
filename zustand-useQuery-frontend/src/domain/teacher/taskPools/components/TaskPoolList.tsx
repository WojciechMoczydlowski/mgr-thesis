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

export default function TaskPoolList() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const {
    data: taskPools,
    isLoading: isTaskPoolsLoading,
    isError,
  } = useTaskPools({
    courseId,
    examId,
  });

  const { mutate: addTaskPool } = useAddTaskPool({ courseId, examId });
  const { mutate: deleteTaskPool } = useDeleteTaskPool({ courseId, examId });
  const { mutate: editTaskPool } = useEditTaskPool({ courseId, examId });

  if (isTaskPoolsLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const openTasksPools = taskPools.filter(
    (taskPool) => taskPool.taskType === TaskType.OPEN
  );

  const closedTasksPools = taskPools.filter(
    (taskPool) => taskPool.taskType === TaskType.CLOSED
  );

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
              selectedTaskPoolId={undefined}
              // selectedTaskPoolId={selectedTaskPool?.id}
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
              // selectedTaskPoolId={selectedTaskPool?.id}
              selectedTaskPoolId={undefined}
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
