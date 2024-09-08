"use client";
import { GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { usePermissionContext } from "@/lib/context/PermissionContext";
import { useGetPermissionQuery } from "@/lib/api/permissionApi";
import GridData from "@/app/components/DataGrid/dataGrid";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import AddButton from "./AddButton";
export default function PermissionList() {
  const { handleDeletePermission } = usePermissionContext();
  const { data, isLoading, error } = useGetPermissionQuery("");
  const columns: GridColDef[] = [
    { field: "event", headerName: "Evenement", width: 300 },
    { field: "dayCount", headerName: "Nombre de jour", width: 300 },
    { field: "voucher", headerName: "Pièce justificative", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <EditButton row={params.row} />,
        <DeleteButton row={params.row} handleDelete={handleDeletePermission} />,
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
      <Box sx={{ height: "500px" }}>
        <GridData data={data} columns={columns} />
      </Box>
    </Box>
  );
}
