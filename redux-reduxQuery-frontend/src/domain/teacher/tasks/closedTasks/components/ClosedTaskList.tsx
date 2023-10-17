import { Flex, Text, Spacer, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { ClosedTask } from "@/domain/student/papers/model/Task";
import ClosedTaskTile from "./ClosedTaskTile";
import {
  useGetClosedTasksQuery,
  usePostClosedTaskMutation,
} from "@/domain/store/teacher";

type Props = {
  taskPoolId: string;
  taskPoolTitle: string;
};

export default function ClosedTaskList({ taskPoolId, taskPoolTitle }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { data: tasks, isLoading } = useGetClosedTasksQuery({
    courseId,
    examId,
    taskPoolId,
  });

  const [postClosedTask, { isLoading: isPostClosedTaskLoading }] =
    usePostClosedTaskMutation();

  if (isLoading) {
    return <Loader />;
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
            Lista zadań zamkniętych dla
            <Text textColor="cyan.600">{taskPoolTitle}</Text>
          </Text>
          <Spacer />
          <AddClosedTaskModal
            isLoading={isPostClosedTaskLoading}
            addClosedTask={(payload) =>
              postClosedTask({ courseId, examId, taskPoolId, payload })
            }
          />
        </Flex>

        {tasks && tasks?.length > 0 ? (
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
      Brak zadań zamkniętych. Dodaj nowe zadania
    </Text>
  );
}

function List({
  tasks,
  taskPoolId,
}: {
  tasks: ClosedTask[];
  taskPoolId: string;
}) {
  return (
    <Flex direction="column" my="4">
      {tasks?.map((task) => {
        return (
          <ClosedTaskTile key={task.id} task={task} taskPoolId={taskPoolId} />
        );
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
