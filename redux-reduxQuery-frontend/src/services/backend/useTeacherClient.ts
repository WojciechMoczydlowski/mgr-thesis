import axios from "axios";
import { useSetupToken } from "../auth/hooks/useToken";
import { useSelector } from "react-redux";
import { selectToken } from "@/domain/store/auth";
import Cookies from "js-cookie";

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

export const teacherClient = () => {
  const clientBase = axios.create({
    baseURL: "http://localhost:8080/api/v1/teacher",
  });

  clientBase.interceptors.request.use((config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  });

  return clientBase;
};
