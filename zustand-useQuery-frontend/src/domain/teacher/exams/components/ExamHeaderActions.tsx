import { Flex, Text, Button, Stack } from "@chakra-ui/react";
import RemoveManyTasksModal from "../../tasks/components/RemoveManyTasksModal";
import MoveManyTasksModal from "../../tasks/components/MoveManyTasksModal";
import {
  useAllSelectedClosedTasksIds,
  useClosedTasksStore,
} from "../../tasks/closedTasks/store/closedTasksStore";
import {
  useAllSelectedOpenTasksIds,
  useOpenTasksStore,
} from "../../tasks/openTasks/store/openTasksStore";
import { useFetchOpenTasks } from "../../tasks/openTasks/endpoints/useFetchOpenTask";
import { useFetchClosedTasks } from "../../tasks/closedTasks/endpoints/useFetchClosedTasks";
import { useTaskPoolStore } from "../../taskPools/store/taskPoolStore";
import { useDeleteManyTasks } from "../../tasks/endpoints/useDeleteManyTasks";

type Props = { courseId: string; examId: string };

export function ExamHeaderActions({ courseId, examId }: Props) {
  const selectedOpenTasksIds = useAllSelectedOpenTasksIds();
  const selectedClosedTasksIds = useAllSelectedClosedTasksIds();

  const openTasksStore = useOpenTasksStore();
  const closedTasksStore = useClosedTasksStore();

  const selectedTaskPool = useTaskPoolStore().selectedTaskPoolId!;

  const unselectAllTasks = () => {
    openTasksStore.unselectedAllTasks();
    closedTasksStore.unselectedAllTasks();
  };

  const selectedOpenTasksCount = selectedOpenTasksIds.length;
  const selectedClosedTasksCount = selectedClosedTasksIds.length;

  const shouldRender =
    selectedTaskPool &&
    (selectedOpenTasksCount > 0 || selectedClosedTasksCount > 0);

  const fetchOpenTasks = useFetchOpenTasks();
  const fetchClosedTasks = useFetchClosedTasks();
  const { mutate: deleteManyTasks } = useDeleteManyTasks({
    courseId,
    examId,
    taskPoolId: selectedTaskPool,
    onSuccess: () => unselectAllTasks(),
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Flex flexGrow="1" flexBasis="0" direction="column">
      <Text fontSize="lg" fontWeight="bold">
        Akcje dla zaznaczonych zadań
      </Text>
      <Text fontSize="small" color="gray.600">
        Wybrane zadania otwarte: {selectedOpenTasksCount}
      </Text>
      <Text fontSize="small" color="gray.600">
        Wybrane zadania zamknięte: {selectedClosedTasksCount}
      </Text>

      <Stack direction="row">
        <Button mt="4" colorScheme="purple" onClick={() => unselectAllTasks()}>
          Odznacz wszystkie
        </Button>
        <MoveManyTasksModal />
        <RemoveManyTasksModal
          fetchClosedTasks={() =>
            fetchClosedTasks({
              taskIds: selectedClosedTasksIds,
              courseId,
              examId,
              taskPoolId: selectedTaskPool,
            })
          }
          fetchOpenTasks={() =>
            fetchOpenTasks({
              taskIds: selectedOpenTasksIds,
              courseId,
              examId,
              taskPoolId: selectedTaskPool,
            })
          }
          deleteTasks={() =>
            deleteManyTasks({
              taskIds: [...selectedClosedTasksIds, ...selectedOpenTasksIds],
            })
          }
        />
      </Stack>
    </Flex>
  );
}
