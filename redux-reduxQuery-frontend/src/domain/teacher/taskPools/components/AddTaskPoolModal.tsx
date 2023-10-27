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
import { TaskType } from "@/domain/store/teacher/tasks";

type Props = {
  addTaskPool: ({
    title,
    taskType,
    description,
    pointsPerTask,
    taskDrawNumber,
  }: {
    title: string;
    taskType: TaskType;
    description: string;
    pointsPerTask: number;
    taskDrawNumber: number;
  }) => void;
};

export default function AddTaskPoolModal({ addTaskPool }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState<TaskType | undefined>();
  const [description, setDescription] = useState("");
  const [pointsPerTask, setPointsPerTask] = useState<number>();
  const [taskDrawNumber, setTaskDrawNumber] = useState<number>();

  const [taskPoolError, setTaskPoolError] = useState("");

  const onSubmit = () => {
    if (title && taskType && description && pointsPerTask && taskDrawNumber) {
      addTaskPool({
        title,
        taskType,
        description,
        pointsPerTask,
        taskDrawNumber,
      });
      onClose();
    } else {
      setTaskPoolError("Pola nie mogą być puste");
    }
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setPointsPerTask(undefined);
    setTaskDrawNumber(undefined);
    setTaskPoolError("");
  };

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Dodaj pulę zadań
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj pulę zadań</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Input
                placeholder="Nazwa puli"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              {taskPoolError && <Text color="tomato">{taskPoolError}</Text>}
              <Select
                placeholder="Wybierz typ zadań w puli"
                onChange={(event) =>
                  setTaskType(event.currentTarget.value as TaskType)
                }
              >
                <option value={TaskType.OPEN}>Zadania otwarte</option>
                <option value={TaskType.CLOSED}>Zadania zamknięte</option>
              </Select>
              <Input
                placeholder="Opis puli"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
              <Input
                type="number"
                placeholder="Liczba punktów za zadanie"
                value={pointsPerTask}
                onChange={(event) =>
                  setPointsPerTask(Number(event.currentTarget.value))
                }
              />
              <Input
                type="number"
                placeholder="Liczba losowanych zadań z puli"
                value={taskDrawNumber}
                onChange={(event) =>
                  setTaskDrawNumber(Number(event.currentTarget.value))
                }
              />
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
