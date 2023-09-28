// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Course } from "./courses/model";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const teacherApi = createApi({
  reducerPath: "teacherApi",
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
    getTeacherCourses: builder.query<Course[], void>({
      query: () => `courses`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTeacherCoursesQuery } = teacherApi;
