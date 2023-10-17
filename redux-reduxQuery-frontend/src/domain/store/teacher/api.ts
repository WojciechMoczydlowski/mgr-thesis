// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Exam } from "@/domain/teacher/exams/model/exam";
import {
  ClosedTasksRequestParams,
  PostClosedTaskPayload,
  PostExamPayload,
  PutClosedTaskPayload,
  PutExamPayload,
} from "./model";
import { ClosedTask } from "./closedTasks";

// Define a service using a base URL and expected endpoints
export const teacherApi = createApi({
  reducerPath: "teacherApi",
  tagTypes: ["Exams", "ClosedTasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/teacher/",
    prepareHeaders(headers) {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // COURSES
    getTeacherCourses: builder.query<Exam[], void>({
      query: () => `courses`,
    }),

    // EXAMS
    getTeacherExams: builder.query<Exam[], { courseId: string }>({
      query: ({ courseId }) => `courses/${courseId}`,
      providesTags: (result) => [
        { type: "Exams", id: "LIST" },
        ...(result
          ? result.map(({ id }) => ({ type: "Exams", id } as const))
          : []),
      ],
    }),

    postTeacherExam: builder.mutation<
      void,
      { courseId: string; payload: PostExamPayload }
    >({
      query({ courseId, payload }) {
        return {
          url: `courses/${courseId}`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Exams", id: "LIST" }],
    }),
    putTeacherExam: builder.mutation<
      void,
      { examId: string; courseId: string; payload: PutExamPayload }
    >({
      query({ examId, courseId, payload }) {
        return {
          url: `courses/${courseId}/${examId}`,
          method: `PUT`,
          body: payload,
        };
      },
      invalidatesTags: (_, __, arg) => [{ type: "Exams", id: arg.examId }],
    }),
    deleteTeacherExam: builder.mutation<
      void,
      { examId: string; courseId: string }
    >({
      query({ examId, courseId }) {
        return {
          url: `courses/${courseId}/${examId}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: (_, __, arg) => [{ type: "Exams", id: arg.examId }],
    }),

    // CLOSED TASKS
    getClosedTasks: builder.query<ClosedTask[], ClosedTasksRequestParams>({
      query: ({ courseId, examId, taskPoolId }) =>
        `courses/${courseId}/${examId}/${taskPoolId}`,
      providesTags: (result) => [
        { type: "ClosedTasks", id: "LIST" },
        ...(result
          ? result.map(({ id }) => ({ type: "ClosedTasks", id } as const))
          : []),
      ],
    }),
    postClosedTask: builder.mutation<
      void,
      ClosedTasksRequestParams & { payload: PostClosedTaskPayload }
    >({
      query({ courseId, examId, taskPoolId, payload }) {
        return {
          url: `courses/${courseId}/${examId}/${taskPoolId}`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "ClosedTasks", id: "LIST" }],
    }),
    deleteClosedTask: builder.mutation<
      void,
      ClosedTasksRequestParams & { taskId: string }
    >({
      query({ examId, courseId, taskPoolId, taskId }) {
        return {
          url: `courses/${courseId}/${examId}/${taskPoolId}/${taskId}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: (_, __, arg) => [
        { type: "ClosedTasks", id: arg.taskId },
      ],
    }),
    putClosedTask: builder.mutation<
      void,
      ClosedTasksRequestParams & {
        taskId: string;
        payload: PutClosedTaskPayload;
      }
    >({
      query({ examId, courseId, taskPoolId, taskId, payload }) {
        return {
          url: `courses/${courseId}/${examId}/${taskPoolId}/${taskId}`,
          method: `PUT`,
          body: payload,
        };
      },
      invalidatesTags: (_, __, arg) => [
        { type: "ClosedTasks", id: arg.taskId },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // courses
  useGetTeacherCoursesQuery,
  // exams
  useGetTeacherExamsQuery,
  usePostTeacherExamMutation,
  usePutTeacherExamMutation,
  useDeleteTeacherExamMutation,
  // closedTasks
  useGetClosedTasksQuery,
  usePostClosedTaskMutation,
  useDeleteClosedTaskMutation,
  usePutClosedTaskMutation,
} = teacherApi;
