import Layout from "@/components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { StudentCoursesList } from "./courses/components/CoursesList";

export function StudentMainPage() {
  return (
    <Layout>
      <Container>
        <StudentCoursesList />
      </Container>
    </Layout>
  );
}
