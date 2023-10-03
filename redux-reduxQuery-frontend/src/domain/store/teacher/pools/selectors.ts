import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectTasksPoolsState = (state: RootState) => state.tasksPools;

export const selectTasksPools = createSelector(
  selectTasksPoolsState,
  (state) => state.tasksPools
);
