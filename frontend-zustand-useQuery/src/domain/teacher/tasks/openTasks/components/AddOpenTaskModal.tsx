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

type Props = {
  addOpenTask: ({ title, content }: { title: string; content: string }) => void;
};

export default function AddOpenTaskModal({ addOpenTask }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [taskError, setTaskError] = useState("");

  const onSubmit = () => {
    if (title && content) {
      addOpenTask({
        title,
        content,
      });
      onClose();
    } else {
      setTaskError("Pola nie mogą być puste");
    }
  };

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setTaskError("");
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
                onChange={(event) => setContent(event.currentTarget.value)}
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
