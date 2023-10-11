import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectTasksPoolsState = (state: RootState) => state.tasksPools;

export const selectTasksPools = createSelector(
  selectTasksPoolsState,
  (state) => state.tasksPools
);

export const selectSelectedTaskPool = createSelector(
  selectTasksPoolsState,
  (state) => {
    const taskPools = state.tasksPools;
    const selectedTaskPool = state.selectedTaskPoolId;

    return taskPools.find((taskPool) => taskPool.id === selectedTaskPool);
  }
);
