import Layout from "@/components/layout/Layout";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Task, TaskType } from "./model/Task";
import { ClosedTaskTile } from "./components/ClosedTaskTile";
import { OpenTaskTile } from "./components/OpenTaskTile";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { Exam } from "@/domain/teacher/exams/model/exam";
import { ExamDetails } from "../exams/model/ExamDetails";

export function StudentPaperPage() {
  const { query, push } = useRouter();

  const courseId = query.courseId as string;
  const paperId = query.paperId as string;

  const exam = {} as ExamDetails;
  const tasks: Task[] = [];

  const submitStudentPaper = () => {};
  const updateClosedTask = () => {};
  const updateStudentOpenTask = () => {};

  if (false) {
    return <Layout>Ładowanie arkusza</Layout>;
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
                  onUpdate={() => updateStudentOpenTask()}
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
          <Button onClick={() => submitStudentPaper()}>Zakończ egzamin</Button>
        </Stack>
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.student.main.make() },
  { name: "Egzaminy", link: routes.student.courses.details.make(courseId) },
];
