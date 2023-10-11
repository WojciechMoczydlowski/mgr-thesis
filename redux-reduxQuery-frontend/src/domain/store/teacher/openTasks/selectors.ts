import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectOpenTasksState = (state: RootState) => state.openTasks;

export const selectOpenTasks = createSelector(
  selectOpenTasksState,
  (state) => state.openTasks
);
