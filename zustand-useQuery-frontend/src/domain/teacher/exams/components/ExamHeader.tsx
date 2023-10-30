import { Flex, Text, Button } from "@chakra-ui/react";

type Props = {
  courseName: string;
  examTitle: string;
  examDescription: string;
  isEditingDisabled: boolean;

  generateExam: () => void;
};

export function ExamHeader({
  courseName,
  examDescription,
  examTitle,
  isEditingDisabled,
  generateExam,
}: Props) {
  return (
    <Flex flexGrow="1" flexBasis="0">
      <Flex direction="column">
        <Text fontSize="lg" fontWeight="bold">
          Szczegóły egzaminu
        </Text>
        <Text>Przedmiot: {courseName}</Text>
        <Text>Tytuł egzaminu: {examTitle}</Text>
        <Text>Opis egzaminu: {examDescription}</Text>
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
    </Flex>
  );
}
