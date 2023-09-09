import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { useExamPapers } from "./endpoints/useExamPapers";
import { Container, Flex, Box, Text, Stack, Spacer } from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";
import { useExamById } from "../endpoints/useExamById";
import { ExamStaticticsPanel } from "./components/examStatisticsPanel";

export function TeacherExamResultsPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const { data: examPapers } = useExamPapers({
    courseId,
    examId,
  });

  const { data: examDetails } = useExamById({
    courseId,
    examId,
  });

  const gradeColor = (grade: number) => {
    if (grade === 2) {
      return "red";
    }
    if (grade === null) {
      return "grey";
    }
    return "green";
  };

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId })}>
      <Container>
        <Flex direction="row" justifyContent="space-between">
          <Flex direction="column" width="80%">
            <Flex direction="column" alignItems="baseline">
              <Text mt="8" fontSize="lg" fontWeight="bold">
                Szczegóły egzaminu
              </Text>
              <Box
                width="100%"
                borderWidth="1px"
                borderRadius="lg"
                p="2"
                my="1"
              >
                <Text fontSize="medium">{examDetails?.title}</Text>
                <Text fontSize="medium">{examDetails?.description}</Text>
                <Text fontSize="small">
                  Data rozpoczęcia: {formatDate(examDetails?.dateTimeStart)}
                </Text>
                <Text fontSize="small">
                  Data rozpoczęcia: {formatDate(examDetails?.dateTimeStart)}
                </Text>
                <Text fontSize="small">
                  Czas trwania: {examDetails?.duration}
                </Text>
              </Box>

              <ExamStaticticsPanel courseId={courseId} examId={examId} />

              <Text mt="8" fontSize="lg" fontWeight="bold">
                Wypełnione egzaminy
              </Text>

              <Spacer />
            </Flex>
            {examPapers?.length === 0 ? (
              <Text my="4" color="red.500">
                Brak ocenionych egzaminów
              </Text>
            ) : (
              <Flex direction="column" my="4">
                {examPapers?.map((examPaper) => {
                  return (
                    <Box
                      cursor="pointer"
                      onClick={() =>
                        push(
                          routes.teacher.courses.exams.results.members.make({
                            courseId,
                            examId,
                            examPaperId: examPaper.id,
                          })
                        )
                      }
                      key={`${examPaper.title}${examPaper.id}`}
                      width="100%"
                      borderWidth="1px"
                      borderRadius="lg"
                      p="2"
                      my="1"
                    >
                      <Stack>
                        <Text fontSize="medium" fontWeight="bold">
                          {examPaper.student.firstname}{" "}
                          {examPaper.student.lastname}
                        </Text>
                        <Text fontSize="medium">
                          Status: {examPaper.status}
                        </Text>
                        <Text fontSize="medium">
                          Liczba punktów: {examPaper.overallPoints}
                        </Text>
                        <Text
                          fontSize="medium"
                          color={gradeColor(examPaper.grade)}
                          fontWeight="bold"
                        >
                          Ocena: {examPaper.grade}
                        </Text>
                      </Stack>
                    </Box>
                  );
                })}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = ({ courseId }: { courseId: string }): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
  { name: "Egzaminy", link: routes.teacher.courses.details.make(courseId) },
];
