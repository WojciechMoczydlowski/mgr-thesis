import {
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AddTaskModal from "./AddOpenTaskModal";
import { InfoSpinner } from "@/components/infoSpinner";
import { SmallCloseIcon } from "@chakra-ui/icons";
import EditOpenTaskModal from "./EditOpenTaskModal";
import { OpenTask } from "@/domain/student/papers/model/Task";
import OpenTaskTile from "./OpenTaskTile";
import { useAppDispatch } from "@/domain/store";
import { useSelector } from "react-redux";
import {
  addOpenTaskThunk,
  fetchOpenTasksThunk,
  selectOpenTasks,
} from "@/domain/store/teacher";
import { useRunInTask } from "@/utils/useRunInTask";
import { useEffect } from "react";
import AddOpenTaskModal from "./AddOpenTaskModal";

type Props = { taskPoolId: string; taskPoolTitle: string };

export default function OpenTaskList({ taskPoolId, taskPoolTitle }: Props) {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const dispatch = useAppDispatch();
  const toast = useToast();

  const tasks = useSelector(selectOpenTasks);

  const {
    isError,
    isRunning: isOpenTasksLoading,
    runInTask: runFetchTasksPoolsTask,
  } = useRunInTask();

  useEffect(() => {
    runFetchTasksPoolsTask(() =>
      dispatch(fetchOpenTasksThunk({ courseId, examId, taskPoolId }))
    );
  }, [courseId, examId, taskPoolId, dispatch, runFetchTasksPoolsTask]);

  const { runInTask: runAddOpenTaskTask } = useRunInTask({
    onError: () =>
      toast({
        status: "error",
        title: "Błąd podczas tworzenia zadania otwartego",
      }),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Zadanie otwarte pomyślnie utworzone",
      });
    },
  });

  if (isOpenTasksLoading) {
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
            Lista zadań otwartych dla
            <Text textColor="cyan.600">{taskPoolTitle}</Text>
          </Text>
          <Spacer />
          <AddOpenTaskModal
            addOpenTask={(params) =>
              runAddOpenTaskTask(() =>
                dispatch(
                  addOpenTaskThunk({ courseId, examId, taskPoolId, ...params })
                )
              )
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
  return (
    <Flex flexGrow="1" justifyContent="center" alignItems="center">
      <InfoSpinner details="Ładowanie pul zadań" />
    </Flex>
  );
}

function Error() {
  return <div>Wystąpił błąd podczas ładowanie pól zadań</div>;
}
