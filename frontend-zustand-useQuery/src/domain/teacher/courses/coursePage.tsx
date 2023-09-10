import { Container, Flex, Text } from "@chakra-ui/react";
import ExamsList from "../exams/components/ExamsList";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { routes } from "@/utils/routes";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";

export function TeacherCoursePage() {
  const { query } = useRouter();
  const courseId = query.courseId as string;

  return (
    <Layout breadcrumbs={makeBreadcrumbs()}>
      <Container width="100%">
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold">
            Szczegóły
          </Text>
          <Text>Przedmiot: {courseId}</Text>
        </Flex>

        <ExamsList />
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = (): Breadcrumb[] => [
  { name: "Kursy", link: routes.teacher.main.make() },
];
