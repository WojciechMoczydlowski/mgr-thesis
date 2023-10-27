import {
  Flex,
  Text,
  Spacer,
  IconButton,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddClosedTaskModal from "./AddClosedTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import ClosedTaskTile from "./ClosedTaskTile";
import {
  useGetClosedTasksQuery,
  usePostClosedTaskMutation,
} from "@/domain/store/teacher";
import { ClosedTask } from "@/domain/store/teacher/closedTasks";
import { useAppDispatch, useAppSelector } from "@/domain/store";
import { selectIsClosedTaskListSelected } from "@/domain/store/teacher/closedTasks/selectors";
import {
  selectManyClosedTasks,
  unSelectManyClosedTasks,
} from "@/domain/store/teacher/closedTasks/slice";

type Props = {
  taskPoolId: string;
  taskPoolTitle: string;
};

export default function ClosedTaskList({ taskPoolId, taskPoolTitle }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();

  const isListSelected = useAppSelector(selectIsClosedTaskListSelected)(
    taskPoolId
  );

  const { data: tasks, isLoading } = useGetClosedTasksQuery({
    courseId,
    examId,
    taskPoolId,
  });

  const [postClosedTask, { isLoading: isPostClosedTaskLoading }] =
    usePostClosedTaskMutation();

  const onCheckList = (isChecked: boolean) => {
    const ids = (tasks ?? []).map((task) => task.id);

    if (isChecked) {
      dispatch(selectManyClosedTasks({ taskIds: ids, taskPoolId }));
    } else {
      dispatch(unSelectManyClosedTasks({ taskIds: ids, taskPoolId }));
    }
  };

  const isListNotEmpty = tasks && tasks.length > 0;

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
          <Stack direction="row">
            <AddClosedTaskModal
              isLoading={isPostClosedTaskLoading}
              addClosedTask={(payload) =>
                postClosedTask({ courseId, examId, taskPoolId, payload })
              }
            />
            {isListNotEmpty && (
              <Checkbox
                size="lg"
                onChange={(e) => onCheckList(e.target.checked)}
                isChecked={isListSelected}
              />
            )}
          </Stack>
        </Flex>

        {isListNotEmpty ? <List tasks={tasks} /> : <EmptyList />}
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
