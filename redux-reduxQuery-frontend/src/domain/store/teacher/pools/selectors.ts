import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TaskType } from "@/domain/student/papers/model/Task";

const selectTasksPoolsState = (state: RootState) => state.tasksPools;

export const selectTasksPools = createSelector(
  selectTasksPoolsState,
  (state) => state.tasksPools
);

export const selectOpenTasksPools = createSelector(
  selectTasksPools,
  (tasksPools) =>
    tasksPools.filter((taskPool) => taskPool.taskType === TaskType.OPEN)
);

export const selectClosedTasksPools = createSelector(
  selectTasksPools,
  (tasksPools) =>
    tasksPools.filter((taskPool) => taskPool.taskType === TaskType.CLOSED)
);

export const selectSelectedTaskPool = createSelector(
  selectTasksPoolsState,
  (state) => {
    const taskPools = state.tasksPools;
    const selectedTaskPool = state.selectedTaskPoolId;

    return taskPools.find((taskPool) => taskPool.id === selectedTaskPool);
  }
);
