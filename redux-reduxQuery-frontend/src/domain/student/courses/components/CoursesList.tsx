import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { Course } from "@/domain/store/teacher/courses/model";

export function StudentCoursesList() {
  const router = useRouter();

  const onSubjectClick = (courseId: string) => {
    router.push(routes.student.courses.details.make(courseId));
  };

  if (false) {
    return <div>Ładowanie kursów</div>;
  }

  if (false) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <>
      <Text fontSize="lg">Przedmioty studenta</Text>
      <Flex direction="column" my="4">
        {([] as Course[]).map((course) => {
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
