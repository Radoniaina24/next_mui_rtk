import PermissionList from "@/app/features/permission/liste";
import { PermissionProvider } from "@/lib/context/PermissionContext";
import { Box } from "@mui/material";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Permission",
};
export default function page() {
  return (
    <PermissionProvider>
      <Box>
        <PermissionList />
      </Box>
    </PermissionProvider>
  );
}
