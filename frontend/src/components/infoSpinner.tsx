import { Flex, Spinner, Text } from "@chakra-ui/react";

type RequestParams = {
  details: string;
};

export function InfoSpinner({ details }: RequestParams) {
  return (
    <Flex direction="column" alignItems="center">
      <Spinner />
      <Text>{details}</Text>
    </Flex>
  );
}
