import { Flex, Text, Spacer } from "@chakra-ui/react";
import AddOpenTaskModal from "../openTasks/components/AddOpenTaskModal";
import AddClosedTaskModal from "../closedTasks/components/AddClosedTaskModal";
import { TaskType } from "@/domain/student/papers/model/Task";

const taskType: TaskType | undefined = undefined;

export function TasksList() {
  return (
    <Flex flexGrow="1">
      {(() => {
        switch (taskType) {
          case TaskType.OPEN:
            return <OpenTasksList />;
          case TaskType.CLOSED:
            return <ClosedTasksList />;
          default:
            return <NotSelectedList />;
        }
      })()}
    </Flex>
  );
}

function OpenTasksList() {
  return (
    <Flex flexGrow="1" direction="column">
      <Flex alignItems="baseline">
        <Text mt="8" fontSize="lg" fontWeight="bold">
          Zadania otwarte
        </Text>
        <Spacer />
        <AddOpenTaskModal addOpenTask={() => {}} />
      </Flex>
      <Flex direction="column">Lista zadań otwartych</Flex>
    </Flex>
  );
}

function ClosedTasksList() {
  return (
    <Flex flexGrow="1" direction="column">
      <Flex alignItems="baseline">
        <Text mt="8" fontSize="lg" fontWeight="bold">
          Zadania zamknięte
        </Text>
        <Spacer />
        <AddClosedTaskModal addClosedTask={() => {}} />
      </Flex>
      <Flex direction="column">Lista zadań</Flex>
    </Flex>
  );
}

function NotSelectedList() {
  return (
    <Flex flexGrow="1" alignItems="center" justifyContent="center">
      <Text fontSize="medium">Proszę wybrać pulę zadań do edycji</Text>
    </Flex>
  );
}
