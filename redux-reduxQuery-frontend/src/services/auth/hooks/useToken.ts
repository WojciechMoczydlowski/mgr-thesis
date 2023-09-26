import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/domain/store";
import { selectToken } from "@/domain/store/auth/selectors";
import { setToken, removeToken as removeAuthToken } from "@/domain/store/auth";

export const useSetupToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentToken = Cookies.get("token");
    if (currentToken) {
      dispatch(setToken(JSON.parse(currentToken)));
    }
  }, [dispatch]);
};

export const useRemoveToken = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(removeAuthToken());
    Cookies.remove("token");
  };
};

export const useSetToken = () => {
  const dispatch = useAppDispatch();

  return (token: string) => {
    dispatch(setToken(token));
    Cookies.set("token", JSON.stringify(token));
  };
};
