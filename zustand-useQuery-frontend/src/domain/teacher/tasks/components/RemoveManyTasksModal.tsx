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
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { OpenTask } from "../openTasks/model/openTask";
import { ClosedTask } from "../closedTasks/model/closedTasks";

type CommonProps = {
  fetchOpenTasks: () => Promise<OpenTask[] | undefined>;
  fetchClosedTasks: () => Promise<ClosedTask[] | undefined>;
  deleteTasks: () => void;
};

type Props = CommonProps & {};

export default function RemoveManyTasksModal({
  fetchClosedTasks,
  fetchOpenTasks,
  deleteTasks,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openTasks, setOpenTasks] = useState<OpenTask[]>([]);
  const [closedTasks, setClosedTasks] = useState<ClosedTask[]>([]);

  const fetchTasks = useCallback(async () => {
    const openTasks = await fetchOpenTasks();
    const closedTasks = await fetchClosedTasks();

    if (openTasks && closedTasks) {
      setOpenTasks(openTasks);
      setClosedTasks(closedTasks);
    } else {
      setError("Błąd podczas pobierania zadań");
    }
  }, [fetchClosedTasks, fetchOpenTasks]);

  useEffect(() => {
    if (isOpen) {
      fetchTasks();
    }
  }, [isOpen, fetchTasks]);

  const [error, setError] = useState("");

  const onSubmit = () => {
    if (true) {
      deleteTasks();
      onClose();
    } else {
      setError("Pola nie mogą być puste");
    }
  };

  return (
    <>
      <Button mt="4" variant="outline" colorScheme="purple" onClick={onOpen}>
        Usuń wiele
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuń zaznaczone zadania</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>{error && <Text color="red">Błąd </Text>}</Stack>
            {openTasks.length > 0 && (
              <Stack>
                <Text fontSize="lg" fontWeight="bold">
                  Zadania otwarte
                </Text>
                {openTasks.map((task, index) => (
                  <Text key={task.id}>{`${index + 1}. ${task.title}`}</Text>
                ))}
              </Stack>
            )}
            {closedTasks.length > 0 && (
              <Stack>
                <Text fontSize="lg" fontWeight="bold">
                  Zadania zamknięte
                </Text>
                {closedTasks.map((task, index) => (
                  <Text key={task.id}>{`${index + 1}. ${task.title}`}</Text>
                ))}
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onSubmit}>
              Usuń zadania
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
