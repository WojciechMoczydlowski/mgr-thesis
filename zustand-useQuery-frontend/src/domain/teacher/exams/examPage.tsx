import Layout from "@/components/layout/Layout";
import { Container, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TaskPoolList from "../taskPools/components/TaskPoolList";
import { useExamById } from "./endpoints/useExamById";
import { InfoSpinner } from "@/components/infoSpinner";
import { useGenerateExam } from "./endpoints/useGenerateExam";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";
import { ExamHeader } from "./components";

export function TeacherExamPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { data: examDetails, isLoading: isExamDetailsLoading } = useExamById({
    courseId,
    examId,
  });

  const { mutate: generateExam } = useGenerateExam({
    courseId,
    examId,
    onSuccess: () => {
      push(routes.teacher.courses.details.make(courseId));
    },
  });

  if (isExamDetailsLoading) {
    return <InfoSpinner details="Ładowanie pul zadań" />;
  }

  const isEditingDisabled = examDetails?.status === ExamStatus.GENERATED;

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container maxW="8xl">
        <ExamHeader
          courseName="mocked course name"
          examDescription={examDetails?.description ?? ""}
          examTitle={examDetails?.title ?? ""}
          generateExam={() => generateExam({})}
          isEditingDisabled={isEditingDisabled}
        />

        <TaskPoolList />
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
  { name: "Egzaminy", link: routes.teacher.courses.details.make(courseId) },
];
