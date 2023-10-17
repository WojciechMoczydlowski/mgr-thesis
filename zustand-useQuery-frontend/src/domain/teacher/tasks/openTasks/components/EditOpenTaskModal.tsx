import { OpenTask } from "@/domain/student/papers/model/Task";
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
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  openTask: OpenTask;
  isLoading: boolean;
  editOpenTask: ({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) => void;
};

export default function EditOpenTaskModal({
  openTask,
  isLoading,
  editOpenTask,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState(openTask.title);
  const [content, setContent] = useState(openTask.content);

  useEffect(() => {
    if (isOpen) {
      setTitle(openTask.title);
      setContent(openTask.content);
    }
  }, [isOpen, openTask.content, openTask.title]);

  const [taskError, setTaskError] = useState("");

  const onSubmit = () => {
    if (title && content) {
      editOpenTask({
        id: openTask.id,
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

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={() => onOpen()}
        icon={<EditIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytuj zadanie</ModalHeader>
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
            <Button
              colorScheme="purple"
              mr={3}
              onClick={onSubmit}
              isLoading={isLoading}
            >
              Zapisz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
