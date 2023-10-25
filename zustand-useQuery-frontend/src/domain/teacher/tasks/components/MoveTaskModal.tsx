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

  moveClosedTask: ({
    destinationTaskPoolId,
  }: {
    destinationTaskPoolId: string;
  }) => void;
};

export default function MoveTaskModal({
  sourceTaskPool,
  destitaionTaskPools,
  isLoading,
  moveClosedTask,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDestinationTaskPoolId, setSelectedDestinationTaskPoolId] =
    useState("");

  const [error, setError] = useState("");

  const onSubmit = () => {
    if (selectedDestinationTaskPoolId) {
      moveClosedTask({
        destinationTaskPoolId: selectedDestinationTaskPoolId,
      });
      onClose();
    } else {
      setError("Pola nie mogą być puste");
    }
  };

  const clearInputs = () => {
    setSelectedDestinationTaskPoolId("");
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
                placeholder="Wybierz docelową pulę zadań"
                onChange={(event) =>
                  setSelectedDestinationTaskPoolId(event.currentTarget.value)
                }
              >
                {destitaionTaskPools.map((taskPool) => (
                  <option key={taskPool.id} value={taskPool.id}>
                    {taskPool.title}
                  </option>
                ))}
              </Select>
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
