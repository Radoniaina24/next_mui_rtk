"use client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetHolidayQuery } from "@/lib/api/holidayApi";
import AlertlDelete from "./alertModalToDeleteHoliday";
import GridData from "@/app/components/DataGrid/dataGrid";
import { useHolidayContext } from "@/lib/context/HolidayContext";
import { EditButton } from "./EditButton";
import AddButton from "./AddButton";
export default function HolidayList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = useGetHolidayQuery({ limit, page });
  console.log(data);
  const { setId, handleOpenAlertToDeleteHoliday, handleOpenModalHoliday } =
    useHolidayContext();

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
        <GridActionsCellItem
          icon={<DeleteForeverIcon color="error" />}
          label="Delete"
          onClick={() => {
            setId(params.id);
            handleOpenAlertToDeleteHoliday();
          }}
        />,
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
      <AlertlDelete />
    </Box>
  );
}
