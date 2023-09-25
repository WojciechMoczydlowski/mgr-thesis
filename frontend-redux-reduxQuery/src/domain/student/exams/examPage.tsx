import Layout from "@/components/layout/Layout";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { formatDate } from "@/utils/formatDate";
import { ExamDetails } from "./model/ExamDetails";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { Exam } from "@/domain/teacher/exams/model/exam";

export function StudentExamPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const exam = {} as Exam;

  const startPaper = () => {};

  const handleClick = (exam: ExamDetails) => {
    if (exam.status === ExamStatus.WRITING) {
      push(
        routes.student.courses.papers.details.make({
          courseId,
          paperId: exam.id,
        })
      );
    } else {
      startPaper();
    }
  };

  if (false) {
    return <div>Ładowanie egzaminu</div>;
  }

  if (false) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container>
        <Stack>
          <Text fontSize="lg">{exam.title}</Text>
          <Text>Opis: {exam.description}</Text>
          {exam.dateTimeStart && (
            <Text>Data startu: {formatDate(exam.dateTimeStart)}</Text>
          )}
          {exam.dateTimeEnd && (
            <Text>Data zakończenia: {formatDate(exam.dateTimeEnd)}</Text>
          )}
          <Text>Czas trwania: {exam.duration}</Text>
          <Button
            isLoading={false}
            colorScheme="purple"
            onClick={() => handleClick(exam)}
            isDisabled={isButtonDisabled(exam)}
          >
            {buttonLabel(exam)}
          </Button>
          {exam.status === ExamStatus.MARKED && (
            <Button
              onClick={() =>
                push(
                  routes.student.courses.exams.details.results.make({
                    courseId,
                    examId,
                  })
                )
              }
            >
              Sprawdź wyniki egzaminu
            </Button>
          )}
        </Stack>
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
  { name: "Kursy", link: routes.student.main.make() },
  { name: "Egzaminy", link: routes.student.courses.details.make(courseId) },
];
