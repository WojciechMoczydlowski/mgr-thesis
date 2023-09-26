import { useAuthStore } from "@/domain/auth/store/authStore";
import { getAuthorityFromToken } from "@/domain/auth/utils/getAuthorityFromToken";
import { authClient } from "@/services/backend/authClient";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const useLogin = () => {
  const authStore = useAuthStore();

  const login = async (email: string, password: string) => {
    const {
      data: { jwt },
    } = await authClient.login(email, password);

    if (jwt) {
      const authority = getAuthorityFromToken(jwt);
      authStore.setAuthority(authority);
      Cookies.set("token", JSON.stringify(jwt));
    }
    return jwt;
  };

  return { login };
};
