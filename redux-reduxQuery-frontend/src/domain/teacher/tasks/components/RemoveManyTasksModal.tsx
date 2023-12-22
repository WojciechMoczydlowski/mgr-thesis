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

export default function RemoveManyTasksModal({}: Props) {
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
        Usuń wiele
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuń zaznaczone zadania</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>{error && <Text color="red">Błąd </Text>}</Stack>
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
