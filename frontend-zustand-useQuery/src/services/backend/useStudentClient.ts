import axios from "axios";
import { useCurrentToken } from "../auth/hooks/useCurrentToken";

export const useStudentClient = () => {
  const clientBase = axios.create({
    baseURL: "http://localhost:8080/api/v1/student",
  });

  const { token } = useCurrentToken();

  clientBase.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return clientBase;
};
