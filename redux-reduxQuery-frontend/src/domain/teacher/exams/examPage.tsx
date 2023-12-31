import Layout from "@/components/layout/Layout";
import { Container, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TaskPoolList from "../taskPools/components/TaskPoolList";
import { InfoSpinner } from "@/components/infoSpinner";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";
import { ExamDetails } from "@/domain/student/exams/model/ExamDetails";
import { ExamHeader } from "./components";
import { TasksList } from "../tasks/components/TasksList";
import { formatDate } from "@/utils/formatDate";
import { ExamHeaderActions } from "./components/ExamHeaderActions";

export function TeacherExamPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  // const examDetails = {} as ExamDetails;
  // const generateExam = () => {};

  // const isEditingDisabled = examDetails?.status === ExamStatus.GENERATED;

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container maxW="8xl">
        <Flex>
          <ExamHeader
            courseName="mocked course name"
            examDescription="mocked exam description"
            examTitle="mocked exam title"
            generateExam={() => {}}
            isEditingDisabled
          />
          <ExamHeaderActions />
        </Flex>
        <Flex flexGrow="1">
          <TaskPoolList />
          <TasksList />
        </Flex>
      </Container>
    </Layout>
  );
}

const buttonLabel = (exam: ExamDetails) => {
  const currentDate = new Date();
  const startDate = new Date(exam.dateTimeStart);
  const endDate = new Date(exam.dateTimeEnd);

  if (currentDate > endDate) {
    return `Egzamin zakończył się o ${formatDate(exam.dateTimeEnd)}`;
  }

  if (currentDate < startDate) {
    return `Egzamin rozpocznie się o ${formatDate(exam.dateTimeStart)}`;
  }

  if (exam.status === ExamStatus.WRITING) {
    return "Wróć do arkusza";
  }

  return "Rozpocznij egzamin";
};

const isButtonDisabled = (exam: ExamDetails) => {
  const currentDate = new Date();
  const startDate = new Date(exam.dateTimeStart);
  const endDate = new Date(exam.dateTimeEnd);

  if (currentDate > endDate || currentDate < startDate) {
    return true;
  }

  return false;
};

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
  { name: "Egzaminy", link: routes.teacher.courses.details.make(courseId) },
];
