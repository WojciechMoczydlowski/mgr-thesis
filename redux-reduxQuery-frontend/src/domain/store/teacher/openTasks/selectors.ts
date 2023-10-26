import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { selectSelectedTaskPool } from "../pools/selectors";

const selectOpenTasksState = (state: RootState) => state.openTasks;
export const selectOpenTasks = (state: RootState) => state.openTasks.tasks;
const selectSelectedOpenTasksIdsDictionary = (state: RootState) =>
  state.openTasks.selectedTasksIds;

export const selectAllSelectedOpenTasksIds = createSelector(
  selectSelectedOpenTasksIdsDictionary,
  (selectedOpenTasksIdsDictionary) =>
    Object.values(selectedOpenTasksIdsDictionary).reduce(
      (curr, prev) => [...curr, ...prev],
      []
    )
);

export const selectIsOpenTaskSelectedChecker = createSelector(
  selectAllSelectedOpenTasksIds,
  (selectedOpenTasksIds) => (taskId: string) =>
    selectedOpenTasksIds.some((id) => id === taskId)
);

export const selectIsOpenTaskListSelected = createSelector(
  selectOpenTasks,
  selectAllSelectedOpenTasksIds,
  (openTasks, selectedOpenTasksIds) =>
    selectedOpenTasksIds.some((id) =>
      openTasks.some((openTask) => openTask.id === id)
    )
);

export const selectOpenTasksByTaskPoolIdSelector = createSelector(
  selectOpenTasks,
  (openTasks) => (taskPoolId: string) =>
    openTasks.filter((openTask) => openTask.taskPoolId === taskPoolId)
);

export const selectSelectedTasksByPoolIdCountSelector = createSelector(
  selectSelectedOpenTasksIdsDictionary,
  (selectedOpenTasksIdsDictionary) => (taskPooldId: string) =>
    (selectedOpenTasksIdsDictionary[taskPooldId] ?? []).length
);
