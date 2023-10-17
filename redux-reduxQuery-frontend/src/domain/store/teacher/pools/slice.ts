import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskPool } from "./model";
import { fetchAllTasksPoolsThunk } from "./thunks";

export interface TasksPoolsState {
  tasksPools: TaskPool[];
  selectedTaskPoolId: string | undefined;
}

const initialState: TasksPoolsState = {
  tasksPools: [],
  selectedTaskPoolId: undefined,
};

export const tasksPoolsSlice = createSlice({
  name: "tasksPools",
  initialState,
  reducers: {
    selectTaskPool: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedTaskPoolId = action.payload.id;
    },
    unSelectTaskPool: (state) => {
      state.selectedTaskPoolId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasksPoolsThunk.fulfilled, (state, { payload }) => {
      state.tasksPools = payload;
    });
  },
});

export const { selectTaskPool, unSelectTaskPool } = tasksPoolsSlice.actions;

export default tasksPoolsSlice.reducer;
