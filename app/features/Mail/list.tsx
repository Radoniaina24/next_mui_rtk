"use client";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";

import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMailContext } from "@/lib/context/MailContext";
import { useGetMailQuery } from "@/lib/api/mailApi";

import AddFormMail from "./form";

import GridData from "@/app/components/DataGrid/dataGrid";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import AddButton from "./AddButton";
export default function MailList() {
  const { handleDeleteMail } = useMailContext();
  const { data, isLoading, error } = useGetMailQuery("");
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom", width: 200 },
    { field: "cc", headerName: "Destinataires", width: 300 },
    { field: "subject", headerName: "Sujet", width: 200 },
    { field: "body", headerName: "Corps", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <EditButton row={params.row} />,
        <DeleteButton row={params.row} handleDelete={handleDeleteMail} />,
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
          Liste des pérmission
        </Typography>
        <AddButton />
      </Box>

      <Box sx={{ height: 650 }}>
        <GridData data={data} columns={columns} />
      </Box>
    </Box>
  );
}
