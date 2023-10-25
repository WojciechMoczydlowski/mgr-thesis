import { createSlice } from "@reduxjs/toolkit";
import { OpenTask } from "./model";
import { fetchOpenTasksThunk } from "./thunks";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TasksPoolsState {
  tasks: OpenTask[];
  selectedTasksIds: string[];
}

const initialState: TasksPoolsState = {
  tasks: [],
  selectedTasksIds: [],
};

export const openTasksSlice = createSlice({
  name: "openTasks",
  initialState,
  reducers: {
    selectOpenTask: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedTasksIds = [...state.selectedTasksIds, action.payload.id];
    },
    selectManyOpenTasks: (state, action: PayloadAction<{ ids: string[] }>) => {
      state.selectedTasksIds = [
        ...state.selectedTasksIds,
        ...action.payload.ids,
      ];
    },
    unSelectManyOpenTasks: (
      state,
      action: PayloadAction<{ ids: string[] }>
    ) => {
      state.selectedTasksIds = state.selectedTasksIds.filter(
        (selectedTaskId) =>
          !action.payload.ids.some((id) => selectedTaskId === id)
      );
    },
    unselectOpenTask: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedTasksIds = state.selectedTasksIds.filter(
        (taskId) => taskId !== action.payload.id
      );
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
