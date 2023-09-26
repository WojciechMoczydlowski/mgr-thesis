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
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { OpenTaskResultExamPaper } from "../model/openTaskResultExamPaper";

type Props = {
  gradeOpenTask: ({
    earnedPoints,
    teacherComment,
  }: {
    earnedPoints: number;
    teacherComment: string;
  }) => void;
  examPaperTask: OpenTaskResultExamPaper;
};

export default function GradeOpenTaskModal({
  examPaperTask,
  gradeOpenTask,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = useState("");
  const [points, setPoints] = useState(0);

  const [pointsError, setPointsError] = useState("");

  const onSubmit = () => {
    if (points >= 0 && points <= Number(examPaperTask.maxPoints)) {
      gradeOpenTask({
        earnedPoints: points,
        teacherComment: comment,
      });
      onClose();
    } else {
      setPointsError("Punktacja przekracza możliwy zakres");
    }
  };

  useEffect(() => {
    setComment(examPaperTask.teacherComment);
    setPoints(Number(examPaperTask.earnedPoints));
    setPointsError("");
  }, [examPaperTask.earnedPoints, examPaperTask.teacherComment, isOpen]);

  return (
    <>
      <Button colorScheme="purple" onClick={onOpen}>
        Oceń zadanie
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Oceń zadanie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>{examPaperTask.content}</Text>
              <Textarea readOnly value={examPaperTask.answer} />

              <Text>
                Maksymalna ilość punktów za zadanie: {examPaperTask.maxPoints}
              </Text>
              <Input
                type="number"
                placeholder="Liczba punktów"
                value={points}
                max={Number(examPaperTask.maxPoints)}
                onChange={(event) => {
                  setPoints(Number(event.currentTarget.value));
                  setPointsError("");
                }}
              />
              {pointsError && <Text color="tomato">{pointsError}</Text>}

              <Input
                placeholder="Komentarz do zadania"
                value={comment}
                onChange={(event) => setComment(event.currentTarget.value)}
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
