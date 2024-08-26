import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
export const metadata: Metadata = {
  title: "Redux Toolkit",
};
export default function IndexPage() {
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography sx={{ textAlign: "center" }}>Permission</Typography>
      </Box>
    </Container>
  );
}
