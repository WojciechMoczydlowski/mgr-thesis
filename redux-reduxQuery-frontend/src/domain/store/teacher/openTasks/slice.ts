import { createSlice } from "@reduxjs/toolkit";
import { OpenTask } from "./model";
import { fetchOpenTasksThunk } from "./thunks";

export interface TasksPoolsState {
  openTasks: OpenTask[];
}

const initialState: TasksPoolsState = {
  openTasks: [],
};

export const openTasksSlice = createSlice({
  name: "openTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOpenTasksThunk.fulfilled, (state, { payload }) => {
      state.openTasks = payload;
    });
  },
});

export default openTasksSlice.reducer;
