import { Flex, Box, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { routes } from "@/utils/routes";
import { useStudentExams } from "../endpoints/useExams";
import { ExamStatus } from "@/domain/exam/model/ExamStatus";

export default function Exams() {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;

  const { data: exams, isLoading: isExamsLoading } = useStudentExams({
    courseId,
  });

  if (isExamsLoading) {
    return <div>Ładowanie egzaminów ...</div>;
  }

  const plannedExams = exams?.filter(
    (exam) =>
      exam.status === ExamStatus.UNRESOLVED ||
      exam.status === ExamStatus.WRITING
  );

  const finishedExams = exams?.filter(
    (exam) => exam.status === ExamStatus.RESOLVED
  );

  const markedExams = exams?.filter(
    (exam) => exam.status === ExamStatus.MARKED
  );

  const gradeColor = (grade: number | null) => {
    if (grade === 2) {
      return "red";
    }
    if (grade === null) {
      return "grey";
    }
    return "green";
  };

  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex direction="column" width="80%">
        <Text fontSize="lg" fontWeight="bold">
          Zaplanowane egzaminy
        </Text>
        {plannedExams?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak zaplanowanych egzaminów
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {plannedExams?.map((plannedExam) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.student.courses.exams.details.make({
                        courseId,
                        examId: plannedExam.id,
                      })
                    )
                  }
                  key={plannedExam.title}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
                >
                  <Stack>
                    <Text fontSize="medium">{plannedExam.title}</Text>
                    <Text fontSize="small">{plannedExam.description}</Text>
                    <Text fontSize="small">
                      Data rozpoczęcia:{" "}
                      {format(
                        new Date(plannedExam.dateTimeStart),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia:{" "}
                      {format(
                        new Date(plannedExam.dateTimeEnd),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
                    </Text>
                    <Text fontSize="small">
                      Czas trwania: {plannedExam.duration} minut
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Flex>
        )}

        <Text fontSize="lg" fontWeight="bold">
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
                      Data rozpoczęcia:{" "}
                      {format(
                        new Date(finishedExam.dateTimeStart),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia:{" "}
                      {format(
                        new Date(finishedExam.dateTimeEnd),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
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

        <Text fontSize="lg" fontWeight="bold">
          Ocenione egzaminy
        </Text>

        {markedExams?.length === 0 ? (
          <Text my="4" color="red.500">
            Brak ocenionych egzaminów
          </Text>
        ) : (
          <Flex direction="column" my="4">
            {markedExams?.map((markedExam) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() =>
                    push(
                      routes.student.courses.exams.details.results.make({
                        courseId,
                        examId: markedExam.id,
                      })
                    )
                  }
                  key={`${markedExam.title}${markedExam.id}`}
                  width="100%"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  my="1"
                >
                  <Stack>
                    <Text fontSize="medium">{markedExam.title}</Text>
                    <Text fontSize="small">{markedExam.description}</Text>
                    <Text fontSize="small">
                      Data rozpoczęcia:{" "}
                      {format(
                        new Date(markedExam.dateTimeStart),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
                    </Text>
                    <Text fontSize="small">
                      Data zakończenia:{" "}
                      {format(
                        new Date(markedExam.dateTimeEnd),
                        "dd/LL/yyyy HH:mm:ss"
                      )}
                    </Text>
                    <Text fontSize="small">
                      Czas trwania: {markedExam.duration} minut
                    </Text>
                    <Text
                      fontSize="small"
                      color={gradeColor(markedExam.grade)}
                      fontWeight="bold"
                    >
                      Ocena: {markedExam.grade}
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
