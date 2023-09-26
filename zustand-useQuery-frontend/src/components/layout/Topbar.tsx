import { Authority, useAuthStore } from "@/domain/auth/store/authStore";
import { useLogout } from "@/services/auth/hooks/useLogout";
import { routes } from "@/utils/routes";
import {
  Box,
  Flex,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Topbar() {
  const { push } = useRouter();
  const { logout } = useLogout();
  const authority = useAuthStore((state) => state.authority);

  const isStudent = authority === Authority.student;
  const isTeacher = authority === Authority.teacher;

  return (
    <Box
      bg="cyan.600"
      position="fixed"
      width="100%"
      height="50px"
      left="0px"
      zIndex="20000"
    >
      <Flex
        height="100%"
        direction="row"
        mx="4"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" alignItems="center">
          <Button
            color="white"
            variant="link"
            onClick={() =>
              push(
                isStudent
                  ? routes.student.main.make()
                  : routes.teacher.main.make()
              )
            }
          >
            Strona główna
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Text color="gray.100">
            Zalogowany jako: {isStudent ? "Student" : "Wykładowca"}
          </Text>
          <Menu>
            <MenuButton as={Button}>Panel</MenuButton>
            <MenuList>
              <MenuItem onClick={() => logout()}>Wyloguj</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Box>
  );
}
