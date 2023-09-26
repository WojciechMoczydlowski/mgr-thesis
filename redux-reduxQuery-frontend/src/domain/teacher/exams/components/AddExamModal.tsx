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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

type Props = {
  addExam: ({
    title,
    description,
    duration,
    endDate,
    startDate,
  }: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    duration: number;
  }) => void;
};

export default function AddExamModal({ addExam }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [duration, setDuration] = useState<number>();

  const [examError, setExamError] = useState("");

  const onSubmit = () => {
    if (title && description && startDate && endDate && duration) {
      addExam({ title, description, startDate, endDate, duration });
      onClose();
    } else {
      setExamError("Pola nie mogą być puste");
    }
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDuration(undefined);
    setExamError("");
  };

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Utwórz egzamin
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Utwórz egzamin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input
                placeholder="Nazwa egzaminu"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              {examError && <Text color="tomato">{examError}</Text>}
              <Input
                placeholder="Opis egzaminu"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
              <Text>Data i czas rozpoczęcia</Text>
              <DateTimePicker
                onChange={(date) => setStartDate(date)}
                value={startDate}
              />
              <Text>Data i czas zakończenia</Text>
              <DateTimePicker
                onChange={(date) => setEndDate(date)}
                value={endDate}
              />
              <Input
                type="number"
                placeholder="Czas trwania w minutach"
                value={duration}
                onChange={(event) =>
                  setDuration(Number(event.currentTarget.value))
                }
              ></Input>
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
