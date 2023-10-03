import Layout from "@/components/layout/Layout";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import OpenTaskList from "../tasks/openTasks/components/OpenTaskList";
import { TaskPoolTypes } from "./const";
import ClosedTaskList from "../tasks/closedTasks/components/ClosedTaskList";
import { InfoSpinner } from "@/components/infoSpinner";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { Exam } from "../exams/model/exam";
import { TaskPool } from "@/domain/store/teacher";

export function TeacherTaskPoolPage() {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const taskPoolId = query.taskPoolId as string;

  const taskPoolDetails = {} as TaskPool;
  const examDetails = {} as Exam;

  if (false) {
    return <InfoSpinner details="Ładowanie zadań" />;
  }

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId, examId: examId })}>
      <Container>
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold">
            Szczegóły
          </Text>
          <Text>Przedmiot: {courseId}</Text>
          <Text>Tytuł egzaminu: {examDetails?.title}</Text>
          <Text>Nazwa puli zadań: {taskPoolDetails?.title}</Text>
        </Flex>

        {taskPoolDetails?.taskType === TaskPoolTypes.open ? (
          <OpenTaskList />
        ) : (
          <ClosedTaskList />
        )}
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({
  courseId,
  examId,
}: {
  courseId: string;
  examId: string;
}): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
  { name: "Egzaminy", link: routes.teacher.courses.details.make(courseId) },
  {
    name: "Edytowany egzamin",
    link: routes.teacher.courses.exams.details.make({ courseId, examId }),
  },
];
