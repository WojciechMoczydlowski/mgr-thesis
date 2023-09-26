import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCurrentToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = Cookies.get("token");
    if (currentToken) {
      setToken(JSON.parse(currentToken));
    }
  }, []);

  const removeToken = () => {
    setToken(null);
    Cookies.remove("token");
  };

  return { token, removeToken };
};
