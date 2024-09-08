import HolidayList from "@/app/features/Holiday/liste";
import { HolidayProvider } from "@/lib/context/HolidayContext";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Holiday",
};
export default function page() {
  return (
    <HolidayProvider>
      <HolidayList />
    </HolidayProvider>
  );
}
