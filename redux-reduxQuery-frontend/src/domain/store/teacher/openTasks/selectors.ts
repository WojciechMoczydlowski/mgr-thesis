import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectOpenTasksState = (state: RootState) => state.openTasks;

export const selectOpenTasks = createSelector(
  selectOpenTasksState,
  (state) => state.tasks
);

export const selectIsOpenTaskSelectedChecker = createSelector(
  selectOpenTasksState,
  (state) => (taskId: string) =>
    state.selectedTasksIds.some((id) => id === taskId)
);

export const selectIsOpenTaskListSelected = createSelector(
  selectOpenTasksState,
  (state) =>
    state.selectedTasksIds.some((id) =>
      state.tasks.some((openTask) => openTask.id === id)
    )
);
