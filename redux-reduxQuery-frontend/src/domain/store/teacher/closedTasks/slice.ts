import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ClosedTasksState {
  selectedTasksIds: Record<string, string[]>;
}

const initialState: ClosedTasksState = {
  selectedTasksIds: {},
};

export const closedTasksSlice = createSlice({
  name: "closedTasks",
  initialState,
  reducers: {
    selectClosedTask: (
      state,
      action: PayloadAction<{ taskId: string; taskPoolId: string }>
    ) => {
      state.selectedTasksIds = {
        ...state.selectedTasksIds,
        [action.payload.taskPoolId]: [
          ...(state.selectedTasksIds[action.payload.taskPoolId] ?? []),
          action.payload.taskId,
        ],
      };
    },
    selectManyClosedTasks: (
      state,
      action: PayloadAction<{ taskIds: string[]; taskPoolId: string }>
    ) => {
      state.selectedTasksIds = {
        ...state.selectedTasksIds,
        [action.payload.taskPoolId]: [
          ...(state.selectedTasksIds[action.payload.taskPoolId] ?? []),
          ...action.payload.taskIds,
        ],
      };
    },
    unSelectManyClosedTasks: (
      state,
      action: PayloadAction<{ taskIds: string[]; taskPoolId: string }>
    ) => {
      state.selectedTasksIds = {
        ...state.selectedTasksIds,
        [action.payload.taskPoolId]: state.selectedTasksIds[
          action.payload.taskPoolId
        ].filter(
          (selectedTaskId) =>
            !action.payload.taskIds.some((id) => selectedTaskId === id)
        ),
      };
    },
    unselectClosedTask: (
      state,
      action: PayloadAction<{ taskId: string; taskPoolId: string }>
    ) => {
      state.selectedTasksIds = {
        ...state.selectedTasksIds,
        [action.payload.taskPoolId]: state.selectedTasksIds[
          action.payload.taskPoolId
        ].filter((selectedTaskId) => selectedTaskId !== action.payload.taskId),
      };
    },
    unselectAllClosedTasks: (state) => {
      state.selectedTasksIds = {};
    },
  },
});

export const {
  selectClosedTask,
  unselectClosedTask,
  selectManyClosedTasks,
  unSelectManyClosedTasks,
  unselectAllClosedTasks,
} = closedTasksSlice.actions;

export default closedTasksSlice.reducer;
