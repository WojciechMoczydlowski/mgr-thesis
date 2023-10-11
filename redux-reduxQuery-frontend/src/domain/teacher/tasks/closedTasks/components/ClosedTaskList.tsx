import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditClosedTaskModal from "./EditClosedTaskModal";
import { ClosedTask, Task } from "@/domain/student/papers/model/Task";
import ClosedTaskTile from "./ClosedTaskTile";

export default function ClosedTaskList() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const tasks: ClosedTask[] = [];
  const addClosedTask = () => {};
  const deleteTask = () => {};
  const editClosedTask = () => {};

  if (false) {
    return <Loader />;
  }

  return (
    <Flex direction="row" justifyContent="space-between" flexGrow="1">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Lista zadań zamkniętych
          </Text>
          <Spacer />
          <AddClosedTaskModal
            addClosedTask={({ title, taskContent, penaltyWeight, answers }) =>
              addClosedTask()
            }
          />
        </Flex>

        {tasks?.length === 0 ? <EmptyList /> : <List tasks={tasks} />}
      </Flex>
    </Flex>
  );
}

function EmptyList() {
  return (
    <Text my="4" color="red.500">
      Brak zadań zamkniętych. Dodaj nowe zadania
    </Text>
  );
}

function List({ tasks }: { tasks: ClosedTask[] }) {
  return (
    <Flex direction="column" my="4">
      {tasks?.map((task) => {
        return <ClosedTaskTile key={task.id} task={task} />;
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
