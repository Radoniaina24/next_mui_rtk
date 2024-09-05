import HolidayList from "@/app/features/Holiday/liste";
import { HolidayProvider } from "@/lib/context/HolidayContext";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Holiday",
};
export default function page() {
  return (
    <HolidayProvider>
      <Box>
        <HolidayList />
      </Box>
    </HolidayProvider>
  );
}
