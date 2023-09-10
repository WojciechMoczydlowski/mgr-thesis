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
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TaskPoolTypes } from "../const";
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  taskPool: TaskPool;
  editTaskPool: ({
    taskPoolId,
    title,
    taskType,
    description,
    pointsPerTask,
    taskDrawNumber,
  }: {
    taskPoolId: string;
    title: string;
    taskType: string;
    description: string;
    pointsPerTask: number;
    taskDrawNumber: number;
  }) => void;
};

export default function EditTaskPoolModal({ taskPool, editTaskPool }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState("");
  const [description, setDescription] = useState("");
  const [pointsPerTask, setPointsPerTask] = useState<number>();
  const [taskDrawNumber, setTaskDrawNumber] = useState<number>();

  const [taskPoolError, setTaskPoolError] = useState("");

  const onSubmit = () => {
    if (title && taskType && description && pointsPerTask && taskDrawNumber) {
      editTaskPool({
        taskPoolId: taskPool.id,
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

  useEffect(() => {
    setTitle(taskPool.title);
    setDescription(taskPool.description);
    setPointsPerTask(taskPool.pointsPerTask);
    setTaskDrawNumber(taskPool.taskDrawNumber);
    setTaskType(taskPool.taskType);

    setTaskPoolError("");
  }, [
    isOpen,
    taskPool.description,
    taskPool.pointsPerTask,
    taskPool.taskDrawNumber,
    taskPool.taskType,
    taskPool.title,
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
          <ModalHeader>Edytuj pulę zadań</ModalHeader>
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
                value={taskType}
                onChange={(event) => setTaskType(event.currentTarget.value)}
              >
                <option value={TaskPoolTypes.open}>Zadania otwarte</option>
                <option value={TaskPoolTypes.closed}>Zadania zamknięte</option>
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
