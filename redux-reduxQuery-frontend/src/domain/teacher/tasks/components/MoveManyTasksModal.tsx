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

type Props = {};

export default function MoveManyTasksModal({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [destinationTaskPoolId, setDestinationTaskPoolId] = useState("");

  const [error, setError] = useState("");

  const onSubmit = () => {
    if (true) {
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
      <Button mt="4" variant="outline" colorScheme="purple" onClick={onOpen}>
        Przenieś wiele
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Przenieś zaznaczone zadania</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>{error && <Text color="red">Błąd </Text>}</Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSubmit}>
              Przenieś zadania
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
