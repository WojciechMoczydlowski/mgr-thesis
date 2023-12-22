import { Flex, Text, Button, Stack } from "@chakra-ui/react";
import RemoveManyTasksModal from "../../tasks/components/RemoveManyTasksModal";
import MoveManyTasksModal from "../../tasks/components/MoveManyTasksModal";
import { useAppDispatch, useAppSelector } from "@/domain/store";
import { selectSelectedClosedTasksCount } from "@/domain/store/teacher/closedTasks/selectors";
import { selectSelectedOpenTasksCount } from "@/domain/store/teacher";
import { unselectAllOpenTasks } from "@/domain/store/teacher/openTasks/slice";
import { unselectAllClosedTasks } from "@/domain/store/teacher/closedTasks/slice";

type Props = {};

export function ExamHeaderActions({}: Props) {
  const dispatch = useAppDispatch();

  const selectedOpenTasksCount = useAppSelector(selectSelectedOpenTasksCount);
  const selectedClosedTasksCount = useAppSelector(
    selectSelectedClosedTasksCount
  );

  const shouldRender =
    selectedOpenTasksCount > 0 || selectedClosedTasksCount > 0;

  const unselectAllTasks = () => {
    dispatch(unselectAllOpenTasks());
    dispatch(unselectAllClosedTasks());
  };

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
        <Button mt="4" colorScheme="purple" onClick={unselectAllTasks}>
          Odznacz wszystkie
        </Button>
        <MoveManyTasksModal />
        <RemoveManyTasksModal />
      </Stack>
    </Flex>
  );
}
