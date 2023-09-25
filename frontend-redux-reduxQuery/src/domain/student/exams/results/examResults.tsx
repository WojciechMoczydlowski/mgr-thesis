import { useRouter } from "next/router";
import {
  Container,
  Flex,
  Box,
  Text,
  Stack,
  Spacer,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { routes } from "@/utils/routes";
import Layout from "@/components/layout/Layout";
import { ExamDetails } from "../model/ExamDetails";
import { ExamMarkingDetails } from "../model/ExamMarkingDetails";

export function StudentExamResultsPage() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;

  const examDetails = {} as ExamDetails;
  const examMarkingDetails = {} as ExamMarkingDetails;

  const gradeColor = (grade: number | null | undefined) => {
    if (grade === 2) {
      return "red";
    }
    if (grade === null) {
      return "grey";
    }
    return "green";
  };

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId, examId })}>
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
                <Text
                  fontSize="medium"
                  fontWeight="bold"
                  color={gradeColor(examDetails?.grade)}
                >
                  Ocena: {examDetails?.grade}
                </Text>
              </Box>
              <Text mt="8" fontSize="lg" fontWeight="bold">
                Szczegóły udzielonych odpowiedzi
              </Text>

              <Spacer />
            </Flex>

            <Flex direction="row" justifyContent="space-between">
              <Flex direction="column" width="80%">
                {examMarkingDetails?.length === 0 ? (
                  <Text my="4" color="red.500">
                    Brak zadań
                  </Text>
                ) : (
                  <Flex direction="column" my="4">
                    {examMarkingDetails?.map((examMarkingDetail) => {
                      return examMarkingDetail.type === "CLOSED" ? (
                        <Box
                          key={examMarkingDetail.title}
                          width="100%"
                          borderWidth="1px"
                          borderRadius="lg"
                          p="2"
                          my="1"
                        >
                          <Stack>
                            <Flex
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text fontSize="medium" fontWeight="bold">
                                {examMarkingDetail.title}
                              </Text>
                            </Flex>
                            <Text fontSize="medium">
                              {examMarkingDetail.content}
                            </Text>
                            {examMarkingDetail.answersExamPaper.map(
                              (answerExamPaper) => {
                                return (
                                  <Flex
                                    key={answerExamPaper.content}
                                    direction="row"
                                    justifyContent="space-between"
                                  >
                                    <Checkbox
                                      isDisabled
                                      defaultChecked={answerExamPaper.isMarked}
                                    >
                                      {answerExamPaper.content}
                                    </Checkbox>
                                    <Text
                                      color={
                                        answerExamPaper.isCorrect
                                          ? "green"
                                          : "red"
                                      }
                                    >
                                      waga: {answerExamPaper.weight}
                                    </Text>
                                  </Flex>
                                );
                              }
                            )}
                            <Text fontSize="medium" fontWeight="bold">
                              Punktacja:{" "}
                              {examMarkingDetail.earnedPoints === null
                                ? "0"
                                : examMarkingDetail.earnedPoints}
                              {"/"}
                              {examMarkingDetail.maxPoints}
                            </Text>
                          </Stack>
                        </Box>
                      ) : (
                        <Box
                          key={examMarkingDetail.title}
                          width="100%"
                          borderWidth="1px"
                          borderRadius="lg"
                          p="2"
                          my="1"
                        >
                          <Stack>
                            <Flex
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text fontSize="medium" fontWeight="bold">
                                {examMarkingDetail.title}
                              </Text>
                            </Flex>
                            <Text fontSize="medium">
                              {examMarkingDetail.content}
                            </Text>
                            <Textarea
                              readOnly
                              value={examMarkingDetail.answer}
                            />
                            <Text fontSize="medium" fontWeight="bold">
                              Punktacja:{" "}
                              {examMarkingDetail.earnedPoints === null
                                ? "zadanie nieocenione"
                                : examMarkingDetail.earnedPoints}
                              {"/"}
                              {examMarkingDetail.maxPoints}
                            </Text>
                            <Text fontSize="medium">
                              Komentarz: {examMarkingDetail.teacherComment}
                            </Text>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
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
  { name: "Kursy", link: routes.student.main.make() },
  { name: "Egzaminy", link: routes.student.courses.details.make(courseId) },
  {
    name: "Podsumowanie egzaminu",
    link: routes.student.courses.exams.details.make({
      courseId,
      examId,
    }),
  },
];
