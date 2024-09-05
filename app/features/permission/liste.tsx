"use client";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { usePermissionContext } from "@/lib/context/PermissionContext";
import { useGetPermissionQuery } from "@/lib/api/permissionApi";
import ModalPermission from "./modal";
import AddFormPermission from "./form";
import AlertlDelete from "./alertModaleToDeletePermission";
import GridData from "@/app/components/DataGrid/dataGrid";
export default function PermissionList() {
  const { handleOpenModalPermission } = usePermissionContext();
  const { data, isLoading, error } = useGetPermissionQuery("");
  const { setId, handleOpenAlertToDeletePermission } = usePermissionContext();
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
        <GridActionsCellItem
          icon={<BorderColorIcon color="primary" />}
          label="Edit"
          onClick={() => {
            setId(params.id);
            handleOpenModalPermission();
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverIcon color="error" />}
          label="Delete"
          onClick={() => {
            setId(params.id);
            handleOpenAlertToDeletePermission();
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
      <Container maxWidth="lg">
        <Typography variant="h5" component={"h4"}>
          Liste des permissions
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ marginRight: "5px", paddingX: "15px" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModalPermission()}
          sx={{ marginTop: "20px" }}
        >
          Ajouter
        </Button>
        <Box>
          <div style={{ height: 650, width: "100%" }}>
            <GridData data={data} columns={columns} />
          </div>
        </Box>
        <ModalPermission>
          <AddFormPermission />
        </ModalPermission>
        <AlertlDelete />
      </Container>
    </Box>
  );
}
