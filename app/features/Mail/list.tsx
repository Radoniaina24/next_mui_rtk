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
import { useMailContext } from "@/lib/context/MailContext";
import { useGetMailQuery } from "@/lib/api/mailApi";
import ModalMail from "./modal";
import AddFormMail from "./form";
import AlertlDelete from "./alertModalToDeleteMail";
import GridData from "@/app/components/DataGrid/dataGrid";
export default function MailList() {
  const { handleOpenModalMail } = useMailContext();
  const { data, isLoading, error } = useGetMailQuery("");
  const { setId, handleOpenAlertToDeleteMail } = useMailContext();
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom", width: 300 },
    { field: "cc", headerName: "Destinataires", width: 300 },
    { field: "subject", headerName: "Sujet", width: 250 },
    { field: "body", headerName: "Corps", width: 250 },
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
            handleOpenModalMail();
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverIcon color="error" />}
          label="Delete"
          onClick={() => {
            setId(params.id);
            handleOpenAlertToDeleteMail();
          }}
        />,
      ],
    },
  ];
  //   if (isLoading)
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           width: "100%",
  //           height: "500px",
  //         }}
  //       >
  //         <CircularProgress color="inherit" />
  //       </Box>
  //     );
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Container maxWidth="xl">
        <Typography variant="h5" component={"h4"}>
          Liste des mails
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ marginRight: "5px", paddingX: "15px" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModalMail()}
          sx={{ marginY: "20px" }}
        >
          Ajouter
        </Button>

        <Box sx={{ height: 650, width: "100%" }}>
          <GridData data={data} columns={columns} />
        </Box>

        <ModalMail>
          <AddFormMail />
        </ModalMail>
        <AlertlDelete />
      </Container>
    </Box>
  );
}
