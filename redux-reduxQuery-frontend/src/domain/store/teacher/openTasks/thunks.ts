import { createAsyncThunk } from "@reduxjs/toolkit";
import { OpenTask, OpenTaskThunkCommon } from "./model";
import { teacherClient } from "@/services/backend";
import { AxiosResponse } from "axios";
import { selectTaskPool } from "../pools";

export const fetchOpenTasksThunk = createAsyncThunk<
  OpenTask[],
  OpenTaskThunkCommon
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
  OpenTaskThunkCommon & {
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

export const updateOpenTaskThunk = createAsyncThunk<
  void,
  OpenTaskThunkCommon & { taskId: string } & Partial<OpenTask>
>(
  "openTasks/update",
  async ({ courseId, examId, taskPoolId, taskId, ...openTask }, thunkAPI) => {
    try {
      await teacherClient().put<{ id: string } & Partial<OpenTask>>(
        `/courses/${courseId}/${examId}/${taskPoolId}/${taskId}`,
        openTask
      );
      thunkAPI.dispatch(fetchOpenTasksThunk({ courseId, examId, taskPoolId }));
    } catch (error) {
      throw error;
    }
  }
);

export const deleteOpenTaskThunk = createAsyncThunk<
  void,
  OpenTaskThunkCommon & { taskId: string }
>(
  "tasksPools/delete",
  async ({ courseId, examId, taskPoolId, taskId }, thunkAPI) => {
    try {
      const response = await teacherClient().delete<
        Omit<OpenTask, "id">,
        AxiosResponse<OpenTask>
      >(`/courses/${courseId}/${examId}/${taskPoolId}/${taskId}`);

      thunkAPI.dispatch(fetchOpenTasksThunk({ courseId, examId, taskPoolId }));
    } catch (error) {
      throw error;
    }
  }
);

export const moveOpenTaskThunk = createAsyncThunk<
  void,
  {
    task: OpenTask;
    courseId: string;
    examId: string;
    destinationTaskPoolId: string;
    sourcePoolId: string;
  }
>(
  "tasksPools/move",
  async (
    { courseId, examId, destinationTaskPoolId, sourcePoolId, task },
    thunkAPI
  ) => {
    const taskId = task.id;

    try {
      await teacherClient().delete<void, AxiosResponse<OpenTask>>(
        `/courses/${courseId}/${examId}/${sourcePoolId}/${taskId}`
      );

      await teacherClient().post<Omit<OpenTask, "id">, AxiosResponse<OpenTask>>(
        `/courses/${courseId}/${examId}/${destinationTaskPoolId}`,
        task
      );

      await thunkAPI.dispatch(
        fetchOpenTasksThunk({
          courseId,
          examId,
          taskPoolId: sourcePoolId,
        })
      );

      await thunkAPI.dispatch(
        fetchOpenTasksThunk({
          courseId,
          examId,
          taskPoolId: destinationTaskPoolId,
        })
      );

      thunkAPI.dispatch(
        selectTaskPool({
          id: Number(destinationTaskPoolId) as unknown as string,
        })
      );
    } catch (error) {
      throw error;
    }
  }
);
