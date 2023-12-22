import axios from "axios";
import Cookies from "js-cookie";

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
