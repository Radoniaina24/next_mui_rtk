import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { PermissionProvider } from "@/lib/context/PermissionContext";
import PermissionList from "./features/permission/liste";
export const metadata: Metadata = {
  title: "Redux Toolkit",
};
export default function IndexPage() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      <PermissionProvider>
        <Box>
          <Typography
            variant="h5"
            component={"h3"}
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Permission
          </Typography>
          <PermissionList />
        </Box>
      </PermissionProvider>
    </Container>
  );
}
