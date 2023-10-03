import { teacherClient } from "@/services/backend";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskPool } from "./model";
import { AxiosResponse } from "axios";

export const fetchAllTasksPoolsThunk = createAsyncThunk<
  TaskPool[],
  { courseId: string; examId: string }
>("tasksPools/fetchAll", async ({ courseId, examId }, thunkAPI) => {
  try {
    const response = await teacherClient().get<TaskPool[]>(
      `/courses/${courseId}/${examId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateTasksPoolThunk = createAsyncThunk<
  void,
  { taskPoolId: string; examId: string; courseId: string } & Partial<TaskPool>
>(
  "tasksPools/update",
  async ({ courseId, examId, taskPoolId, ...taskPool }, thunkAPI) => {
    try {
      await teacherClient().put<{ id: string } & Partial<TaskPool>>(
        `/courses/${courseId}/${examId}/${taskPoolId}`,
        taskPool
      );
      thunkAPI.dispatch(fetchAllTasksPoolsThunk({ courseId, examId }));
    } catch (error) {
      throw error;
    }
  }
);

export const addTasksPoolThunk = createAsyncThunk<
  TaskPool,
  { examId: string; courseId: string } & Omit<TaskPool, "id">
>("tasksPools/update", async ({ courseId, examId, ...taskPool }, thunkAPI) => {
  try {
    const response = await teacherClient().post<
      Omit<TaskPool, "id">,
      AxiosResponse<TaskPool>
    >(`/courses/${courseId}/${examId}`, taskPool);

    thunkAPI.dispatch(fetchAllTasksPoolsThunk({ courseId, examId }));

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteTasksPoolThunk = createAsyncThunk<
  TaskPool,
  { examId: string; courseId: string; tasksPoolId: string }
>("tasksPools/delete", async ({ courseId, examId, tasksPoolId }, thunkAPI) => {
  try {
    const response = await teacherClient().delete<
      Omit<TaskPool, "id">,
      AxiosResponse<TaskPool>
    >(`/courses/${courseId}/${examId}/${tasksPoolId}`);

    thunkAPI.dispatch(fetchAllTasksPoolsThunk({ courseId, examId }));

    return response.data;
  } catch (error) {
    throw error;
  }
});
