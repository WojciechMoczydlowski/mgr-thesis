import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getAuthorityFromToken } from "./utils";

const selectAuthState = (state: RootState) => state.auth;

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectAuthority = createSelector(selectToken, (token) =>
  token ? getAuthorityFromToken(token) : null
);
