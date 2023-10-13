import { Flex, Text, Spacer } from "@chakra-ui/react";
import AddOpenTaskModal from "../openTasks/components/AddOpenTaskModal";
import AddClosedTaskModal from "../closedTasks/components/AddClosedTaskModal";
import { TaskType } from "@/domain/student/papers/model/Task";
import OpenTaskList from "../openTasks/components/OpenTaskList";
import ClosedTaskList from "../closedTasks/components/ClosedTaskList";
import { useSelector } from "react-redux";
import { selectSelectedTaskPool } from "@/domain/store/teacher/pools/selectors";

export function TasksList() {
  const selectedTaskPool = useSelector(selectSelectedTaskPool);

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
