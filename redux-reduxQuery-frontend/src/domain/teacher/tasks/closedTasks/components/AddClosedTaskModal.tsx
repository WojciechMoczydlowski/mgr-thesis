import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type Props = {
  isLoading?: boolean;
  addClosedTask: ({
    title,
    content,
    penaltyWeight,
    answers,
  }: {
    title: string;
    content: string;
    penaltyWeight: number;
    answers: {
      content: string;
      weight: number;
      isCorrect: boolean;
    }[];
  }) => void;
};

const initAnswerState = {
  content: "",
  weight: 1,
  isCorrect: false,
};

export default function AddClosedTaskModal({ addClosedTask }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [content, setTaskContent] = useState("");
  const [penaltyWeight, setPenaltyWeight] = useState<number>();
  const [taskError, setTaskError] = useState("");

  const [answers, setAnswers] = useState([initAnswerState]);

  const addNewAnswer = () => {
    setAnswers((answers) => [...answers, initAnswerState]);
  };

  const onSubmit = () => {
    if (title && content && penaltyWeight) {
      addClosedTask({
        title,
        content,
        penaltyWeight,
        answers,
      });
      onClose();
    } else {
      setTaskError("Pola nie mogą być puste");
    }
  };

  const editAnswerContent = (indexToUpdate: number, value: string) => {
    setAnswers((answers) =>
      answers.map((answer, index) =>
        index === indexToUpdate ? { ...answer, content: value } : answer
      )
    );
  };

  const editAnswerWeight = (indexToUpdate: number, value: number) => {
    setAnswers((answers) =>
      answers.map((answer, index) =>
        index === indexToUpdate ? { ...answer, weight: value } : answer
      )
    );
  };

  const editAnswerCorrectness = (indexToUpdate: number, value: string) => {
    setAnswers((answers) =>
      answers.map((answer, index) =>
        index === indexToUpdate
          ? { ...answer, isCorrect: value === "true" }
          : answer
      )
    );
  };

  const clearInputs = () => {
    setTitle("");
    setTaskContent("");
    setTaskError("");
    setPenaltyWeight(undefined);
    setAnswers([initAnswerState]);
  };

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Dodaj zadanie
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj zadanie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input
                placeholder="Nazwa zadania"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              {taskError && <Text color="tomato">{taskError}</Text>}

              <Input
                placeholder="Treść zadania"
                value={content}
                onChange={(event) => setTaskContent(event.currentTarget.value)}
              />

              <Input
                type="number"
                placeholder="Waga kary za błędne odpowiedzi"
                value={penaltyWeight}
                onChange={(event) =>
                  setPenaltyWeight(Number(event.currentTarget.value))
                }
              />

              {answers?.map((answer, i) => (
                <Stack key={i}>
                  <Text fontSize="md">Odpowiedź {i + 1}</Text>
                  <Input
                    placeholder="Treść odpowiedzi"
                    value={answer.content}
                    onChange={(event) =>
                      editAnswerContent(i, event.currentTarget.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Waga odpowiedzi"
                    value={answer.weight}
                    onChange={(event) =>
                      editAnswerWeight(i, Number(event.currentTarget.value))
                    }
                  />
                  <Select
                    onChange={(event) =>
                      editAnswerCorrectness(i, event.currentTarget.value)
                    }
                  >
                    <option value="true">Poprawna</option>
                    <option value="false">Błędna</option>
                  </Select>
                </Stack>
              ))}

              <Button
                colorScheme="purple"
                variant="outline"
                mr={3}
                onClick={addNewAnswer}
              >
                Dodaj kolejną odpowiedź
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSubmit}>
              Zapisz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
