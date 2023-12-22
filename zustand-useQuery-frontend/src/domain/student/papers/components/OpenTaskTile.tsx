import { Text, Card, Textarea, Stack } from "@chakra-ui/react";
import { StudentOpenTask } from "../model/Task";
import { useMemo, useState } from "react";
import { debounce } from "lodash";

type Props = {
  task: StudentOpenTask;
  onUpdate: ({ taskId, answer }: { taskId: string; answer: string }) => void;
};

export function OpenTaskTile({ task, onUpdate }: Props) {
  const [value, setValue] = useState<string>(task.answer);

  const debouncedUpdate = useMemo(() => debounce(onUpdate, 1000), [onUpdate]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    debouncedUpdate({ answer: newValue, taskId: task.id });
  };

  return (
    <Card padding="4">
      <Stack>
        <Text>{task.content}</Text>
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Wpisz odpowiedź"
        />
      </Stack>
    </Card>
  );
}
