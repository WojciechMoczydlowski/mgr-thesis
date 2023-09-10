import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTeacherCourses } from "@/domain/teacher/courses/endpoints/useCourses";
import { routes } from "@/utils/routes";
import { useStudentCourses } from "../endpoints";

export function StudentCoursesList() {
  const router = useRouter();

  const { data: courses, isLoading, isError } = useStudentCourses();

  const onSubjectClick = (courseId: string) => {
    router.push(routes.student.courses.details.make(courseId));
  };

  if (isLoading) {
    return <div>Ładowanie kursów</div>;
  }

  if (isError) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <>
      <Text fontSize="lg">Przedmioty studenta</Text>
      <Flex direction="column" my="4">
        {courses?.map((course) => {
          return (
            <Box
              key={course.code}
              onClick={() => onSubjectClick(course.code)}
              cursor="pointer"
              borderWidth="1px"
              borderRadius="lg"
              p="2"
              my="1"
            >
              {course.name}
            </Box>
          );
        })}
      </Flex>
    </>
  );
}
