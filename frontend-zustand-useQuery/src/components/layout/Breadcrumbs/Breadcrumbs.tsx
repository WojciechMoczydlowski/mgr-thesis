import Link from "next/link";
import { Breadcrumb } from "./model/Breadcrumbs";
import { routes } from "@/utils/routes";
import { Box, Container, Stack, Text } from "@chakra-ui/react";

type Props = {
  breadcrumbs: Breadcrumb[];
};

export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <Container padding="80px 16px 40px 16px">
      <Stack direction="row">
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index} {...breadcrumb} />
        ))}
      </Stack>
    </Container>
  );
}

function BreadcrumbItem({ link, name }: Breadcrumb) {
  return (
    <Link href={link}>
      <Text color="blue.600"> /{name}</Text>
    </Link>
  );
}
