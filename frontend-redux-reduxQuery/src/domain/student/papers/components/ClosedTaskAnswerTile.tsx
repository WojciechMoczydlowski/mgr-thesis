import { Flex, Text, Checkbox } from "@chakra-ui/react";
import { ClosedTaskAnswer } from "../model/Task";
import { useState } from "react";

type Props = {
  answer: ClosedTaskAnswer;
  onUpdate: (isMarked: boolean) => void;
};

export function ClosedTaskAnswerTile({ answer, onUpdate }: Props) {
  return (
    <Flex gap="4">
      <Checkbox
        isChecked={answer.isMarked}
        onChange={(e) => onUpdate(e.target.checked)}
      />
      <Text>{answer.content}</Text>
    </Flex>
  );
}
