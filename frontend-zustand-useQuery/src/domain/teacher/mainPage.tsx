import Layout from "@/components/layout/Layout";
import { TeacherCoursesList } from "@/domain/teacher/courses/components/CoursesList";
import { Container, Flex } from "@chakra-ui/react";

export function TeacherMainPage() {
  return (
    <Layout>
      <Container>
        <Flex direction="column">
          <TeacherCoursesList />
        </Flex>
      </Container>
    </Layout>
  );
}
