import { Flex, Box, Text, Stack, Card } from "@chakra-ui/react";
import { StudentClosedTask } from "../model/Task";
import { ClosedTaskAnswerTile } from "./ClosedTaskAnswerTile";

type Props = {
  task: StudentClosedTask;
  onUpdate: ({
    answerId,
    taskId,
    isMarked,
  }: {
    answerId: number;
    taskId: string;
    isMarked: boolean;
  }) => void;
};

export function ClosedTaskTile({ task, onUpdate }: Props) {
  return (
    <Card padding="4">
      <Stack>
        <Text>{task.content}</Text>
        <Stack>
          {[
            ...task.answers
              .sort((a, b) => a.id - b.id)
              .map((answer) => (
                <ClosedTaskAnswerTile
                  key={answer.id}
                  answer={answer}
                  onUpdate={(isMarked) =>
                    onUpdate({ taskId: task.id, answerId: answer.id, isMarked })
                  }
                />
              )),
          ]}
        </Stack>
      </Stack>
    </Card>
  );
}
