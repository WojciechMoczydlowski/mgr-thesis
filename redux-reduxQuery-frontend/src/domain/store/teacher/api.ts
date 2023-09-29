// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Exam } from "@/domain/teacher/exams/model/exam";
import { PostExamPayload, PutExamPayload } from "./model";

// Define a service using a base URL and expected endpoints
export const teacherApi = createApi({
  reducerPath: "teacherApi",
  tagTypes: ["Exams"],
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
    getTeacherCourses: builder.query<Exam[], void>({
      query: () => `courses`,
    }),
    // Exams
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
} = teacherApi;
