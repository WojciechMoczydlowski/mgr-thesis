import axios from "axios";
import { useSetupToken } from "../auth/hooks/useToken";
import { useSelector } from "react-redux";
import { selectToken } from "@/domain/store/auth/selectors";
import Cookies from "js-cookie";

export const useStudentClient = () => {
  const clientBase = axios.create({
    baseURL: "http://localhost:8080/api/v1/student",
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

export const studentClient = () => {
  const clientBase = axios.create({
    baseURL: "http://localhost:8080/api/v1/student",
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
