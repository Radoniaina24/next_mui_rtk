import MailList from "@/app/features/Mail/list";
import { MailProvider } from "@/lib/context/MailContext";
import { Box } from "@mui/material";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Mail",
};
export default function page() {
  return (
    <MailProvider>
      <Box>
        <MailList />
      </Box>
    </MailProvider>
  );
}
