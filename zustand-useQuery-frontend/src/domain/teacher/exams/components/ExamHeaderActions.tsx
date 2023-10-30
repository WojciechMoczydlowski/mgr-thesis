import { Flex, Text, Button, Stack } from "@chakra-ui/react";
import RemoveManyTasksModal from "../../tasks/components/RemoveManyTasksModal";
import MoveManyTasksModal from "../../tasks/components/MoveManyTasksModal";
import {
  useAllSelectedClosedTasksCount,
  useClosedTasksStore,
} from "../../tasks/closedTasks/store/closedTasksStore";
import {
  useAllSelectedOpenTasksCount,
  useOpenTasksStore,
} from "../../tasks/openTasks/store/openTasksStore";

type Props = {};

export function ExamHeaderActions({}: Props) {
  const selectedOpenTasksCount = useAllSelectedOpenTasksCount();
  const selectedClosedTasksCount = useAllSelectedClosedTasksCount();

  const openTasksStore = useOpenTasksStore();
  const closedTasksStore = useClosedTasksStore();

  const unselectAllTasks = () => {
    openTasksStore.unselectedAllTasks();
    closedTasksStore.unselectedAllTasks();
  };

  const shouldRender =
    selectedOpenTasksCount > 0 || selectedClosedTasksCount > 0;

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
        <RemoveManyTasksModal />
      </Stack>
    </Flex>
  );
}
