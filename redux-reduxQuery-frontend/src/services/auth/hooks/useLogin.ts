import { getAuthorityFromToken } from "@/domain/store/auth/utils";
import { useAppDispatch } from "@/domain/store";
import { authClient } from "@/services/backend/authClient";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useSetToken } from "./useToken";

export const useLogin = () => {
  const setToken = useSetToken();

  return async (email: string, password: string) => {
    const {
      data: { jwt },
    } = await authClient.login(email, password);

    if (jwt) {
      setToken(jwt);
    }
  };
};
