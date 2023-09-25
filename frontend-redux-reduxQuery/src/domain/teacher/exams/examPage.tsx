import Layout from "@/components/layout/Layout";
import { Container, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TaskPoolList from "../taskPools/components/TaskPoolList";
import { InfoSpinner } from "@/components/infoSpinner";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";
import { ExamDetails } from "@/domain/student/exams/model/ExamDetails";

export function TeacherExamPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const examDetails = {} as ExamDetails;
  const generateExam = () => {};

  if (false) {
    return <InfoSpinner details="Ładowanie pul zadań" />;
  }

  const isEditingDisabled = examDetails?.status === ExamStatus.GENERATED;

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container>
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold">
            Szczegóły
          </Text>
          <Text>Przedmiot: {courseId}</Text>
          <Text>Tytuł egzaminu: {examDetails?.title}</Text>
          <Text>Opis egzaminu: {examDetails?.description}</Text>
        </Flex>

        <Button
          mt="4"
          variant="outline"
          colorScheme="purple"
          isDisabled={isEditingDisabled}
          onClick={() => generateExam()}
        >
          Generuj egzamin dla studentów
        </Button>

        <TaskPoolList />
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
  { name: "Egzaminy", link: routes.teacher.courses.details.make(courseId) },
];
