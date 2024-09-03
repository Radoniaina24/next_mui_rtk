import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { PermissionProvider } from "@/lib/context/PermissionContext";
import PermissionList from "./features/permission/liste";
import { HolidayProvider } from "@/lib/context/HolidayContext";
import HolidayList from "./features/Holiday/liste";
import AddFormOther from "./features/other/form";
import { OtherProvider } from "@/lib/context/OtherContext";
import OtherList from "./features/other/liste";
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
      {/* <HolidayProvider>
        <Box sx={{ marginY: "60px" }}>
          <Typography
            variant="h5"
            component={"h3"}
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Holiday
          </Typography>
          <HolidayList />
        </Box>
      </HolidayProvider> */}
      {/* <OtherProvider>
        <Typography
          variant="h5"
          component={"h3"}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Autre Paramètre
        </Typography>
        <OtherList />
      </OtherProvider> */}
    </Container>
  );
}
