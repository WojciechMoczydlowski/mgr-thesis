import jwt_decode from "jwt-decode";
import { Authority } from "../store/authStore";

export function getAuthorityFromToken(token: string) {
  const decodedJwt = jwt_decode<{
    token: string;
    claims: { authority: Authority }[];
  }>(token);

  return decodedJwt["claims"][0]["authority"];
}
