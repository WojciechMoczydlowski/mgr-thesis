export const routes = {
  main: {
    path: "",
    make: () => "",
  },
  auth: {
    login: { path: "/login", make: () => routes.auth.login.path },
  },
  teacher: {
    main: { path: "/teacher", make: () => routes.teacher.main.path },
    courses: {
      details: {
        path: "/teacher/courses/[courseId]",
        make: (courseId: string) => `/teacher/courses/${courseId}`,
      },
      exams: {
        details: {
          path: "/teacher/courses/[courseId]/exams/[examId]",
          make: ({ courseId, examId }: { courseId: string; examId: string }) =>
            `/teacher/courses/${courseId}/exams/${examId}`,
        },
        taskPools: {
          details: {
            path: "/teacher/courses/[courseId]/exams/[examId]/taskPools/[taskPoolId]",
            make: ({
              courseId,
              examId,
              taskPoolId,
            }: {
              courseId: string;
              examId: string;
              taskPoolId: string;
            }) =>
              `/teacher/courses/${courseId}/exams/${examId}/taskPools/${taskPoolId}`,
          },
        },
        results: {
          path: "/teacher/courses/[courseId]/exams/[examId]/results",
          make: ({ courseId, examId }: { courseId: string; examId: string }) =>
            `/teacher/courses/${courseId}/exams/${examId}/results`,
          members: {
            path: "/teacher/courses/[courseId]/exams/[examId]/results/members/[examPaperId]",
            make: ({
              courseId,
              examId,
              examPaperId,
            }: {
              courseId: string;
              examId: string;
              examPaperId: string;
            }) =>
              `/teacher/courses/${courseId}/exams/${examId}/results/members/${examPaperId}`,
          },
        },
      },
    },
  },
  student: {
    main: { path: "/student", make: () => routes.student.main.path },
    courses: {
      details: {
        path: "/student/courses/[courseId]",
        make: (courseId: string) => `/student/courses/${courseId}`,
      },
      exams: {
        details: {
          path: "/student/courses/[courseId]/exams/[examId]",
          make: ({ courseId, examId }: { courseId: string; examId: string }) =>
            `/student/courses/${courseId}/exams/${examId}`,
          results: {
            path: "/student/courses/[courseId]/exams/[examId]/results",
            make: ({
              courseId,
              examId,
            }: {
              courseId: string;
              examId: string;
            }) => `/student/courses/${courseId}/exams/${examId}/results`,
          },
        },
      },
      papers: {
        details: {
          path: "/student/courses/[courseId]/papers/[paperId]",
          make: ({
            courseId,
            paperId,
          }: {
            courseId: string;
            paperId: string;
          }) => `/student/courses/${courseId}/papers/${paperId}`,
        },
      },
    },
  },
};

export const authRoutes = [routes.auth.login.path];

export const teacherRoutes = [
  routes.teacher.main.path,
  routes.teacher.courses.details.path,
];

export const studentRoutes = [routes.student.main.path];
