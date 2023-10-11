import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";
import OpenTaskTile from "./OpenTaskTile";

export default function OpenTaskList() {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const tasks: OpenTask[] = [];
  const addOpenTask = () => {};

  if (false) {
    return <Loader />;
  }

  return (
    <Flex direction="row" justifyContent="space-between" flexGrow="1">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Lista zadań otwartych
          </Text>
          <Spacer />
          <AddTaskModal addOpenTask={(params) => addOpenTask()} />
        </Flex>
        {tasks?.length === 0 ? <EmptyList /> : <List tasks={tasks} />}
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

function List({ tasks }: { tasks: OpenTask[] }) {
  return (
    <Flex direction="column" my="4">
      {tasks?.map((task) => {
        return <OpenTaskTile key={task.id} task={task} />;
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
