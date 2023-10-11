import { createAsyncThunk } from "@reduxjs/toolkit";
import { OpenTask } from "./model";
import { teacherClient } from "@/services/backend";
import { AxiosResponse } from "axios";

export const fetchOpenTasksThunk = createAsyncThunk<
  OpenTask[],
  { courseId: string; examId: string; taskPoolId: string }
>("openTasks/fetch", async ({ courseId, examId, taskPoolId }) => {
  try {
    const response = await teacherClient().get<OpenTask[]>(
      `/courses/${courseId}/${examId}/${taskPoolId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addOpenTaskThunk = createAsyncThunk<
  OpenTask,
  { examId: string; courseId: string; taskPoolId: string } & {
    title: string;
    content: string;
  }
>(
  "openTasks/add",
  async ({ courseId, examId, taskPoolId, ...openTask }, thunkAPI) => {
    try {
      const response = await teacherClient().post<
        Omit<OpenTask, "id">,
        AxiosResponse<OpenTask>
      >(`/courses/${courseId}/${examId}/${taskPoolId}`, openTask);

      thunkAPI.dispatch(fetchOpenTasksThunk({ courseId, examId, taskPoolId }));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
