import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { PermissionProvider } from "@/lib/context/PermissionContext";
export const metadata: Metadata = {
  title: "Redux Toolkit",
};
export default function IndexPage() {
  return (
    <Container maxWidth="lg">
      <PermissionProvider>
        <Box>
          <Typography sx={{ textAlign: "center" }}>Permission</Typography>
        </Box>
      </PermissionProvider>
    </Container>
  );
}
