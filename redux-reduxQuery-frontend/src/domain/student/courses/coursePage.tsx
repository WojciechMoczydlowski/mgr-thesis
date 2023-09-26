import { Container, Flex } from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import ExamsList from "../exams/components/ExamsList";
import { Breadcrumb } from "@/components/layout/Breadcrumbs/model/Breadcrumbs";
import { routes } from "@/utils/routes";

export function StudentCoursePage() {
  return (
    <Layout breadcrumbs={makeBreadcrumbs()}>
      <Container width="100%">
        <ExamsList />
      </Container>
    </Layout>
  );
}

const makeBreadcrumbs = (): Breadcrumb[] => [
  { name: "Kursy", link: routes.student.main.make() },
];
