import Layout from "@/components/layout/Layout";
import {
  Container,
  Flex,
  Stack,
  Text,
  Box,
  Checkbox,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import GradeOpenTaskModal from "./components/GradeOpenTaskModal";
import { ExamPaperTasks } from "./model/ExamPaperTasks";

export function TeacherExamStudentResultsPage() {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const examId = query.examId as string;
  const examPaperId = query.memberId as string;

  const examPaperTasks = {} as ExamPaperTasks;
  const gradeOpenTask = () => {};

  return (
    <Layout breadcrumbs={makeBreadcrumbs({ courseId, examId })}>
      <Container>
        <Text fontSize="xl" fontWeight="bold">
          Udzielone odpowiedzi
        </Text>

        <Flex direction="row" justifyContent="space-between">
          <Flex direction="column" width="80%">
            {examPaperTasks?.length === 0 ? (
              <Text my="4" color="red.500">
                Brak zadań
              </Text>
            ) : (
              <Flex direction="column" my="4">
                {examPaperTasks?.map((examPaperTask) => {
                  return examPaperTask.type === "CLOSED" ? (
                    <Box
                      key={examPaperTask.title}
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
                            {examPaperTask.title}
                          </Text>
                        </Flex>
                        <Text fontSize="medium">{examPaperTask.content}</Text>
                        {examPaperTask.answersExamPaper.map(
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
                                    answerExamPaper.isCorrect ? "green" : "red"
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
                          {examPaperTask.earnedPoints === null
                            ? "0"
                            : examPaperTask.earnedPoints}
                          {"/"}
                          {examPaperTask.maxPoints}
                        </Text>
                      </Stack>
                    </Box>
                  ) : (
                    <Box
                      key={examPaperTask.title}
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
                            {examPaperTask.title}
                          </Text>
                          <Stack direction="row">
                            <GradeOpenTaskModal
                              examPaperTask={examPaperTask}
                              gradeOpenTask={(params) => gradeOpenTask()}
                            />
                          </Stack>
                        </Flex>
                        <Text fontSize="medium">{examPaperTask.content}</Text>
                        <Textarea readOnly value={examPaperTask.answer} />
                        <Text fontSize="medium" fontWeight="bold">
                          Punktacja:{" "}
                          {examPaperTask.earnedPoints === null
                            ? "zadanie nieocenione"
                            : examPaperTask.earnedPoints}
                          {"/"}
                          {examPaperTask.maxPoints}
                        </Text>
                        <Text fontSize="medium">
                          Komentarz: {examPaperTask.teacherComment}
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
    name: "Wyniki egzaminu",
    link: routes.teacher.courses.exams.results.make({ courseId, examId }),
  },
];
