import { Flex, Text, Spacer } from "@chakra-ui/react";
import AddOpenTaskModal from "../openTasks/components/AddOpenTaskModal";
import AddClosedTaskModal from "../closedTasks/components/AddClosedTaskModal";
import OpenTaskList from "../openTasks/components/OpenTaskList";
import ClosedTaskList from "../closedTasks/components/ClosedTaskList";
import { useTaskPoolStore } from "../../taskPools/store/taskPoolStore";
import { TaskType } from "../model";

type Props = {
  selectedTaskPool?: TaskPool;
};

export function TasksList({ selectedTaskPool }: Props) {
  if (!selectedTaskPool) {
    return <NotSelectedList />;
  }

  return (
    <Flex flexGrow="1" flexBasis="0">
      {(() => {
        switch (selectedTaskPool.taskType) {
          case TaskType.OPEN:
            return (
              <OpenTaskList
                taskPoolId={selectedTaskPool.id}
                taskPoolTitle={selectedTaskPool.title}
              />
            );
          case TaskType.CLOSED:
            return (
              <ClosedTaskList
                taskPoolId={selectedTaskPool.id}
                taskPoolTitle={selectedTaskPool.title}
              />
            );
          default:
            return <NotSelectedList />;
        }
      })()}
    </Flex>
  );
}

function NotSelectedList() {
  return (
    <Flex
      flexGrow="1"
      flexBasis="0"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="medium">Proszę wybrać pulę zadań do edycji</Text>
    </Flex>
  );
}
