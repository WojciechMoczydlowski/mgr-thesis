import { Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTeacherCourses } from "@/domain/teacher/courses/endpoints/useCourses";
import { routes } from "@/utils/routes";
import { InfoSpinner } from "@/components/infoSpinner";

export function TeacherCoursesList() {
  const router = useRouter();

  const { data: courses, isLoading, isError } = useTeacherCourses();

  const onSubjectClick = (courseId: string) => {
    router.push(routes.teacher.courses.details.make(courseId));
  };

  if (isLoading) {
    return <InfoSpinner details="Ładowanie kursów" />;
  }

  if (isError) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <>
      <Text fontSize="lg" fontWeight="bold">
        Przedmioty prowadzącego
      </Text>
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
