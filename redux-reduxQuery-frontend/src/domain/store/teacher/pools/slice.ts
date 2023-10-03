import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskPool } from "./model";
import { fetchAllTasksPoolsThunk } from "./thunks";

export interface TasksPoolsState {
  tasksPools: TaskPool[];
}

const initialState: TasksPoolsState = {
  tasksPools: [],
};

export const tasksPoolsSlice = createSlice({
  name: "tasksPools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasksPoolsThunk.fulfilled, (state, { payload }) => {
      state.tasksPools = payload;
    });
  },
});

export default tasksPoolsSlice.reducer;
