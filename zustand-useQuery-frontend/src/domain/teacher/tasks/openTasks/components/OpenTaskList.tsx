import {
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { InfoSpinner } from "@/components/infoSpinner";
import { useDeleteTask } from "../../endpoints/useDeleteTask";
import { OpenTask } from "../model/openTask";
import { useOpenTasks } from "../endpoints/useOpenTasks";
import { useAddOpenTask } from "../endpoints/useAddOpenTask";
import { useEditOpenTask } from "../endpoints/useEditOpenTask";
import OpenTaskTile from "./OpenTaskTile";
import AddOpenTaskModal from "./AddOpenTaskModal";
import {
  useIsOpenTaskSelected,
  useIsOpenTasksListSelected,
  useOpenTasksStore,
} from "../store/openTasksStore";

type Props = { taskPoolId: string; taskPoolTitle: string };

export default function OpenTaskList({ taskPoolId, taskPoolTitle }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError,
  } = useOpenTasks({
    courseId,
    examId,
    taskPoolId,
  });

  const { mutate: addOpenTask } = useAddOpenTask({
    courseId,
    examId,
    taskPoolId,
  });

  const openTasksStore = useOpenTasksStore();
  const isListSelected = useIsOpenTasksListSelected({ taskPoolId });

  const onCheckList = (checked: boolean) => {
    const taskIds = tasks?.map((task) => task.id);

    if (!taskIds) {
      return;
    }

    if (checked) {
      openTasksStore.selectManyTasks({ taskIds, taskPoolId });
    } else {
      openTasksStore.unselectManyTasks({ taskPoolId });
    }
  };

  const isListNotEmpty = tasks?.length && tasks?.length > 0;

  if (isTasksLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      flexGrow="1"
      flexBasis="0"
    >
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Lista zadań otwartych dla
            <Text textColor="cyan.600">{taskPoolTitle}</Text>
          </Text>
          <Spacer />
          <Stack direction="row">
            <AddOpenTaskModal addOpenTask={(params) => addOpenTask(params)} />
            {isListNotEmpty && (
              <Checkbox
                size="lg"
                onChange={(e) => onCheckList(e.target.checked)}
                isChecked={isListSelected}
              />
            )}
          </Stack>
        </Flex>
        {isListNotEmpty ? (
          <List tasks={tasks} taskPoolId={taskPoolId} />
        ) : (
          <EmptyList />
        )}
      </Flex>
    </Flex>
  );
}

function EmptyList() {
  return (
    <Text my="4" color="red.500">
      Brak zadań otwarych. Dodaj nowe zadania
    </Text>
  );
}

function List({
  tasks,
  taskPoolId,
}: {
  tasks: OpenTask[];
  taskPoolId: string;
}) {
  return (
    <Flex direction="column" my="4">
      {tasks?.map((task) => {
        return (
          <OpenTaskTile key={task.id} task={task} taskPoolId={taskPoolId} />
        );
      })}
    </Flex>
  );
}

function Loader() {
  return (
    <Flex flexGrow="1" justifyContent="center" alignItems="center">
      <InfoSpinner details="Ładowanie pul zadań" />
    </Flex>
  );
}

function Error() {
  return <div>Wystąpił błąd podczas ładowanie pól zadań</div>;
}
