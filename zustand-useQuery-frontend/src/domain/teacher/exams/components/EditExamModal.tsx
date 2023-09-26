import { EditIcon } from "@chakra-ui/icons";
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
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Exam } from "../model/exam";

type Props = {
  exam: Exam;
  editExam: ({
    examId,
    title,
    description,
    duration,
    dateTimeStart,
    dateTimeEnd,
  }: {
    examId: string;
    title: string;
    description: string;
    dateTimeStart: Date;
    dateTimeEnd: Date;
    duration: number;
  }) => void;
};

export default function EditExamModal({ exam, editExam }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeStart, setDateTimeStart] = useState<Date | null>(new Date());
  const [dateTimeEnd, setDateTimeEnd] = useState<Date | null>(new Date());
  const [duration, setDuration] = useState<number>();

  const [examError, setExamError] = useState("");

  const onSubmit = () => {
    if (title && description && dateTimeStart && dateTimeEnd && duration) {
      editExam({
        examId: exam.id,
        title,
        description,
        dateTimeStart,
        dateTimeEnd,
        duration,
      });
      onClose();
    } else {
      setExamError("Pola nie mogą być puste");
    }
  };

  useEffect(() => {
    setTitle(exam.title);
    setDescription(exam.description);
    setDateTimeStart(new Date(exam.dateTimeStart));
    setDateTimeEnd(new Date(exam.dateTimeEnd));
    setDuration(exam.duration);

    setExamError("");
  }, [
    exam.dateTimeEnd,
    exam.dateTimeStart,
    exam.description,
    exam.duration,
    exam.title,
    isOpen,
  ]);

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        icon={<EditIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytuj egzamin</ModalHeader>
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
                onChange={(date) => setDateTimeStart(date)}
                value={dateTimeStart}
              />
              <Text>Data i czas zakończenia</Text>
              <DateTimePicker
                onChange={(date) => setDateTimeEnd(date)}
                value={dateTimeEnd}
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
