import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import { PermissionProvider } from "@/lib/context/PermissionContext";
import PermissionList from "./features/permission/liste";
import { HolidayProvider } from "@/lib/context/HolidayContext";
import HolidayList from "./features/Holiday/liste";
import AddFormOther from "./features/other/form";
import { OtherProvider } from "@/lib/context/OtherContext";
import OtherList from "./features/other/liste";
import { MailProvider } from "@/lib/context/MailContext";
import MailList from "./features/Mail/list";
export const metadata: Metadata = {
  title: "Redux Toolkit",
};
export default function IndexPage() {
  return <div>OKOKO</div>;
}
// <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
//   <PermissionProvider>
//     <Box>
//       <PermissionList />
//     </Box>
//   </PermissionProvider>
//   <MailProvider>
//     <Box>
//       <MailList />
//     </Box>
//   </MailProvider>
//   <HolidayProvider>
//     <Box sx={{ marginY: "60px" }}>
//       <Typography
//         variant="h5"
//         component={"h3"}
//         sx={{ textAlign: "center", fontWeight: "bold" }}
//       >
//         Holiday
//       </Typography>
//       <HolidayList />
//     </Box>
//   </HolidayProvider>
//   <OtherProvider>
//     <Typography
//       variant="h5"
//       component={"h3"}
//       sx={{ textAlign: "center", fontWeight: "bold" }}
//     >
//       Autre Paramètre
//     </Typography>
//     <OtherList />
//   </OtherProvider>
// </Container>
