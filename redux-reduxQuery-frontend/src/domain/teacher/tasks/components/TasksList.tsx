import { Flex, Text, Spacer } from "@chakra-ui/react";
import AddOpenTaskModal from "../openTasks/components/AddOpenTaskModal";
import AddClosedTaskModal from "../closedTasks/components/AddClosedTaskModal";
import { TaskType } from "@/domain/student/papers/model/Task";
import OpenTaskList from "../openTasks/components/OpenTaskList";
import ClosedTaskList from "../closedTasks/components/ClosedTaskList";

const taskType: TaskType | undefined = TaskType.OPEN;

export function TasksList() {
  return (
    <Flex flexGrow="1">
      {(() => {
        switch (taskType) {
          case TaskType.OPEN:
            return <OpenTaskList />;
          case TaskType.CLOSED:
            return <ClosedTaskList />;
          default:
            return <NotSelectedList />;
        }
      })()}
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
