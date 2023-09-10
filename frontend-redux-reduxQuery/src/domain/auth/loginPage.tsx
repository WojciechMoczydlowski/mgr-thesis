import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLogin } from "@/services/auth/hooks/useLogin";
import { routes } from "@/utils/routes";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useLogin();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await login(email, password);
      // TODO Decide where to navigate
      router.push(routes.main.make());
    } catch (e) {
      setError("Błędny email lub hasło");
    }
  };

  return (
    <Flex width="100%" justifyContent="center" mt="160px">
      <Card width="40%">
        <CardHeader>Zaloguj się</CardHeader>
        <CardBody>
          <Stack>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Input
              type="password"
              placeholder="hasło"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            {error && <Text color="tomato">{error}</Text>}
          </Stack>
        </CardBody>
        <CardFooter>
          <Button onClick={onSubmit}>Login</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}
