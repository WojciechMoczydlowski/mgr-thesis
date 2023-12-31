import { TaskPool } from "@/domain/store/teacher";
import { ArrowForwardIcon } from "@chakra-ui/icons";
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

type Props = {
  sourceTaskPool: TaskPool;
  destitaionTaskPools: TaskPool[];
  isLoading?: boolean;

  moveTask: ({
    destinationTaskPoolId,
  }: {
    destinationTaskPoolId: string;
  }) => void;
};

export default function MoveTaskModal({
  sourceTaskPool,
  destitaionTaskPools,
  isLoading,

  moveTask,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [destinationTaskPoolId, setDestinationTaskPoolId] = useState("");

  const [error, setError] = useState("");

  const onSubmit = () => {
    if (destinationTaskPoolId) {
      moveTask({
        destinationTaskPoolId: destinationTaskPoolId,
      });
      onClose();
    } else {
      setError("Pola nie mogą być puste");
    }
  };

  const clearInputs = () => {
    setDestinationTaskPoolId("");
  };

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

  return (
    <>
      <IconButton
        aria-label="move"
        onClick={onOpen}
        isLoading={isLoading}
        icon={<ArrowForwardIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Przenieś zadanie z {sourceTaskPool.title} do innej puli
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Select
                placeholder="Wybierz pulę zadań"
                onChange={(event) =>
                  setDestinationTaskPoolId(event.currentTarget.value)
                }
              >
                {destitaionTaskPools.map((taskPool) => (
                  <option key={taskPool.id} value={taskPool.id}>
                    {taskPool.title}
                  </option>
                ))}
              </Select>
              {error && <Text color="red">Wybierz pulę zadań</Text>}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSubmit}>
              Przenieś zadanie
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
