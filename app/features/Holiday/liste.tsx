"use client";
import { GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetHolidayQuery } from "@/lib/api/holidayApi";
import GridData from "@/app/components/DataGrid/dataGrid";
import { useHolidayContext } from "@/lib/context/HolidayContext";
import { EditButton } from "./EditButton";
import AddButton from "./AddButton";
import { DeleteButton } from "./DeleteButton";
export default function HolidayList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = useGetHolidayQuery({ limit, page });
  const { handleDeleteHoliday } = useHolidayContext();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom", width: 300 },
    { field: "date", headerName: "Date", width: 300 },
    {
      field: "dayType",
      headerName: "Jours",
      width: 250,
      renderCell: (params) => {
        return params.value === 0 ? "Demi-journée" : "Toute la journée";
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <EditButton row={params.row} />,
        <DeleteButton row={params.row} handleDelete={handleDeleteHoliday} />,
      ],
    },
  ];
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component={"h4"}>
          Liste des jours fériés
        </Typography>
        <AddButton />
      </Box>
      <Box sx={{ height: "500px" }}>
        <GridData
          data={data}
          columns={columns}
          onPage={setPage}
          onLimit={setLimit}
        />
      </Box>
    </Box>
  );
}
