import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useCurrentToken } from "./useCurrentToken";

export const useLogout = () => {
  const { push } = useRouter();
  const { removeToken } = useCurrentToken();

  const logout = () => {
    removeToken();
    push(routes.auth.login.make());
  };

  return { logout };
};
