import axios from "axios";

const authBase = axios.create({
  baseURL: "http://localhost:8080/api/v1/auth",
});

export const authClient = {
  login: (email: string, password: string) =>
    authBase.post<unknown, { data: { jwt: string } }>("/authenticate", {
      email,
      password,
    }),
};
