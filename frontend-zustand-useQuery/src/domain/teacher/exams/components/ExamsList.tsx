import { Flex, Box, Text, Stack, Spacer, IconButton } from "@chakra-ui/react";
import AddExamModal from "./AddExamModal";
import { useExams } from "../endpoints/useExams";
import { useAddExam } from "../endpoints/useAddExam";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { InfoSpinner } from "@/components/infoSpinner";
import { formatDate } from "@/utils/formatDate";
import { useDeleteExam } from "../endpoints/useDeleteExam";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEditExam } from "../endpoints/useEditExam";
import EditExamModal from "./EditExamModal";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";

export default function Exams() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;

  const { data: exams, isLoading: isExamsLoading } = useExams({
    courseId,
  });

  const { mutate: addExam } = useAddExam({ courseId });
  const { mutate: deleteExam } = useDeleteExam({ courseId });
  const { mutate: editExam } = useEditExam({ courseId });

  if (isExamsLoading) {
    return <InfoSpinner details="Ładowanie egzaminów" />;
  }

  const createdExams = exams?.filter(
    (exam) => exam.status === ExamStatus.CREATED
  );

  const generatedExams = exams?.filter(
    (exam) => exam.status === ExamStatus.GENERATED
  );

  const finishedExams = exams?.filter(
    (exam) => exam.status === ExamStatus.FINISHED
  );

  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex direction="column" width="80%">
        <Flex direction="row" alignItems="baseline">
          <Text mt="8" fontSize="lg" fontWeight="bold">
            Utworzone egzaminy
          </Text>
          <Spacer />
          <AddExamModal
            addExam={({ title, description, startDate, endDate, duration }) =>
              addExam({
                title,
                description,
                dateTimeStart: startDate.toISOString(),
                dateTimeEnd: endDate.toISOString(),
                duration,
              })
            }
          />
        </Flex>
        {createdExams?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak utworzonych egzaminów
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {createdExams?.map((createdExam) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.teacher.courses.exams.details.make({
                        courseId,
                        examId: createdExam.id,
                      })
                    )
                  }
                  key={createdExam.title}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
                >
                  <Stack>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize="medium">{createdExam.title}</Text>

                      <Stack direction="row">
                        <EditExamModal
                          exam={createdExam}
                          editExam={(params) =>
                            editExam({
                              ...params,
                              examId: createdExam.id,
                              dateTimeStart: params.dateTimeStart.toISOString(),
                              dateTimeEnd: params.dateTimeEnd.toISOString(),
                            })
                          }
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteExam({ examId: createdExam.id });
                          }}
                          aria-label="delete"
                          icon={<SmallCloseIcon />}
                        />
                      </Stack>
                    </Flex>
                    <Text fontSize="small">{createdExam.description}</Text>
                    <Text fontSize="small">
                      Data rozpoczęcia: {formatDate(createdExam.dateTimeStart)}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia: {formatDate(createdExam.dateTimeEnd)}
                    </Text>
                    <Text fontSize="small">
                      Czas trwania: {createdExam.duration} minut
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Flex>
        )}

        <Text mt="8" fontSize="lg" fontWeight="bold">
          Wygenerowane egzaminy
        </Text>
        {generatedExams?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak wygenerowanych egzaminów
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {generatedExams?.map((generatedExam) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.teacher.courses.exams.results.make({
                        courseId,
                        examId: generatedExam.id,
                      })
                    )
                  }
                  key={`${generatedExam.title}${generatedExam.id}`}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
                >
                  <Stack>
                    <Text fontSize="medium">{generatedExam.title}</Text>
                    <Text fontSize="small">{generatedExam.description}</Text>
                    <Text fontSize="small">
                      Data rozpoczęcia:{" "}
                      {formatDate(generatedExam.dateTimeStart)}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia: {formatDate(generatedExam.dateTimeEnd)}
                    </Text>
                    <Text fontSize="small">
                      Czas trwania: {generatedExam.duration} minut
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Flex>
        )}

        <Text mt="8" fontSize="lg" fontWeight="bold">
          Zakończone egzaminy
        </Text>
        {finishedExams?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak zakończonych egzaminów
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {finishedExams?.map((finishedExam) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.teacher.courses.exams.results.make({
                        courseId,
                        examId: finishedExam.id,
                      })
                    )
                  }
                  key={`${finishedExam.title}${finishedExam.id}`}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
                >
                  <Stack>
                    <Text fontSize="medium">{finishedExam.title}</Text>
                    <Text fontSize="small">{finishedExam.description}</Text>
                    <Text fontSize="small">
                      Data rozpoczęcia: {formatDate(finishedExam.dateTimeStart)}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia: {formatDate(finishedExam.dateTimeEnd)}
                    </Text>
                    <Text fontSize="small">
                      Czas trwania: {finishedExam.duration} minut
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
