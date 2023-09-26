import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRemoveToken, useSetupToken } from "./useToken";

export const useLogout = () => {
  const { push } = useRouter();
  const removeToken = useRemoveToken();

  const logout = () => {
    removeToken();
    push(routes.auth.login.make());
  };

  return { logout };
};
