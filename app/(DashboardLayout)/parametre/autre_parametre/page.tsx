import OtherList from "@/app/features/other/liste";
import { OtherProvider } from "@/lib/context/OtherContext";
import { Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Other parameter",
};
export default function page() {
  return (
    <OtherProvider>
      <Typography
        variant="h5"
        component={"h3"}
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Autre Paramètre
      </Typography>
      <OtherList />
    </OtherProvider>
  );
}
