import Layout from "@/components/layout/Layout";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useStudentPaper } from "./endpoints/usePaper";
import { useStudentExamDetails } from "../exams/endpoints/useExamDetails";
import { TaskType } from "./model/Task";
import { ClosedTaskTile } from "./components/ClosedTaskTile";
import { OpenTaskTile } from "./components/OpenTaskTile";
import { useUpdateStudentClosedTask } from "./endpoints/useUpdateClosedTask";
import { useUpdateStudentOpenTask } from "./endpoints/useUpdateOpenTask";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { useSubmitStudentPaper } from "./endpoints/useSubmitSubmit";

export function StudentPaperPage() {
  const { query, push } = useRouter();

  const courseId = query.courseId as string;
  const paperId = query.paperId as string;

  const { data: exam, isLoading: isExamLoading } = useStudentExamDetails({
    courseId,
    examId: paperId,
  });

  const { data: tasks, isLoading: isPaperLoading } = useStudentPaper({
    courseId,
    paperId,
  });

  const { mutate: updateClosedTask } = useUpdateStudentClosedTask({
    courseId,
    paperId,
  });

  const { mutate: updateOpenTask } = useUpdateStudentOpenTask({
    courseId,
    paperId,
  });

  const { mutate: submitStudentPaper } = useSubmitStudentPaper({
    courseId,
    paperId,
    onSuccess: () => {
      push(routes.student.courses.details.make(courseId));
    },
  });

  if (isExamLoading || isPaperLoading) {
    return <Layout>Ładowanie arkusza</Layout>;
  }

  if (!exam || !tasks) {
    return <Layout>Błąd podczas ładowania egzaminu</Layout>;
  }

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container>
        <Stack>
          <Stack>
            <Text fontSize="lg">{exam.title}</Text>
            <Text>Opis: {exam.description}</Text>
            <Text>Czas trwania: {exam.duration}</Text>
          </Stack>
          <Text fontSize="xl">Zadania</Text>
          {tasks.map((task, index) => {
            if (task.type === TaskType.OPEN) {
              return (
                <OpenTaskTile
                  key={task.id}
                  task={task}
                  onUpdate={updateOpenTask}
                />
              );
            }

            if (task.type === TaskType.CLOSED) {
              return (
                <ClosedTaskTile
                  key={task.id}
                  task={task}
                  onUpdate={updateClosedTask}
                />
              );
            }

            return <div key={index}>Błąd w wyświetleniu zadania</div>;
          })}
          <Button onClick={() => submitStudentPaper({})}>
            Zakończ egzamin
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.student.main.make() },
  { name: "Egzaminy", link: routes.student.courses.details.make(courseId) },
];
