import { Box, Container } from "@chakra-ui/react";
import Topbar from "./Topbar";
import { Breadcrumb } from "./Breadcrumbs/model/Breadcrumbs";
import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
};

export default function Layout({ breadcrumbs, children }: Props) {
  return (
    <Box>
      <Topbar />
      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      <Box padding={breadcrumbs ? 0 : "80px"} width="full">
        {children}
      </Box>
    </Box>
  );
}
