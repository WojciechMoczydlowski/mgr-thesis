import { Container, Flex, Box, Text, Spacer } from "@chakra-ui/react";

type Props = {
  courseId: string;
  examId: string;
};

export function ExamStaticticsPanel({ courseId, examId }: Props) {
  const statistics = {} as Statistics;

  return (
    <Container>
      <Flex direction="row" justifyContent="space-between">
        <Flex direction="column" width="100%">
          <Flex direction="column" alignItems="baseline">
            <Text mt="8" fontSize="lg" fontWeight="bold">
              Statystyki
            </Text>
            <Box width="100%" borderWidth="1px" borderRadius="lg" p="2" my="1">
              {statistics ? (
                <>
                  <Text fontSize="medium">
                    Średnia ilość punktów z egzaminu:{" "}
                    {statistics?.averagePoints}
                  </Text>
                  <Text fontSize="medium">
                    Średnia ocena z egzaminu: {statistics?.averageGrade}
                  </Text>
                </>
              ) : (
                <Text fontSize="medium">Brak statystyk</Text>
              )}
            </Box>

            <Spacer />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
