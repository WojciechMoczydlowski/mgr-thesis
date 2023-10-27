import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { selectSelectedTaskPool } from "../pools/selectors";

const selectSelectedClosedTasksIdsDictionary = (state: RootState) =>
  state.closedTasks.selectedTasksIds;

export const selectAllSelectedClosedTasksIds = createSelector(
  selectSelectedClosedTasksIdsDictionary,
  (selectedClosedTasksIdsDictionary) =>
    Object.values(selectedClosedTasksIdsDictionary).reduce(
      (curr, prev) => [...curr, ...prev],
      []
    )
);

export const selectIsClosedTaskSelectedChecker = createSelector(
  selectAllSelectedClosedTasksIds,
  (selectedClosedTasksIds) => (taskId: string) =>
    selectedClosedTasksIds.some((id) => id === taskId)
);

export const selectIsClosedTaskListSelected = createSelector(
  selectSelectedClosedTasksIdsDictionary,
  (selectedClosedTasksIds) => (taskPoolId: string) =>
    selectedClosedTasksIds[taskPoolId]?.length > 0
);

export const selectSelectedClosedTasksCountSelector = createSelector(
  selectSelectedClosedTasksIdsDictionary,
  (selectedClosedTasksIdsDictionary) => (taskPooldId: string) =>
    (selectedClosedTasksIdsDictionary[taskPooldId] ?? []).length
);
