import { Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { InfoSpinner } from "@/components/infoSpinner";
import { Course } from "@/domain/store/teacher/courses/model";

export function TeacherCoursesList() {
  const router = useRouter();

  const courses: Course[] = [];

  const onSubjectClick = (courseId: string) => {
    router.push(routes.teacher.courses.details.make(courseId));
  };

  if (false) {
    return <InfoSpinner details="Ładowanie kursów" />;
  }

  if (false) {
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
