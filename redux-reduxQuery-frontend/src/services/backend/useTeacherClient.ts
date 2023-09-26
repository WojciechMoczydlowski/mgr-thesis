import axios from "axios";
import { useSetupToken } from "../auth/hooks/useToken";
import { useSelector } from "react-redux";
import { selectToken } from "@/domain/store/auth";

export const useTeacherClient = () => {
  const clientBase = axios.create({
    baseURL: "http://localhost:8080/api/v1/teacher",
  });

  const token = useSelector(selectToken);

  clientBase.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return clientBase;
};
