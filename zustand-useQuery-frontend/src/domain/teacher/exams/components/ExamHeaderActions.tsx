import { Flex, Text, Button, Stack } from "@chakra-ui/react";
import RemoveManyTasksModal from "../../tasks/components/RemoveManyTasksModal";
import MoveManyTasksModal from "../../tasks/components/MoveManyTasksModal";

type Props = {};

export function ExamHeaderActions({}: Props) {
  return (
    <Flex flexGrow="1" flexBasis="0" direction="column">
      <Text fontSize="lg" fontWeight="bold">
        Akcje dla zaznaczonych zadań
      </Text>

      <Stack direction="row">
        <Button mt="4" colorScheme="purple" onClick={() => {}}>
          Odznacz wszystkie
        </Button>
        <MoveManyTasksModal />
        <RemoveManyTasksModal />
      </Stack>
    </Flex>
  );
}
