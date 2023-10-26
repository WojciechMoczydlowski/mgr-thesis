import { createSlice } from "@reduxjs/toolkit";
import { OpenTask } from "./model";
import { fetchOpenTasksThunk } from "./thunks";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TasksPoolsState {
  tasks: OpenTask[];
  selectedTasksIds: Record<string, string[]>;
}

const initialState: TasksPoolsState = {
  tasks: [],
  selectedTasksIds: {},
};

export const openTasksSlice = createSlice({
  name: "openTasks",
  initialState,
  reducers: {
    selectOpenTask: (
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
    selectManyOpenTasks: (
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
    unSelectManyOpenTasks: (
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
    unselectOpenTask: (
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOpenTasksThunk.fulfilled, (state, { payload }) => {
      state.tasks = payload;
    });
  },
});

export const {
  selectOpenTask,
  unselectOpenTask,
  selectManyOpenTasks,
  unSelectManyOpenTasks,
} = openTasksSlice.actions;

export default openTasksSlice.reducer;
