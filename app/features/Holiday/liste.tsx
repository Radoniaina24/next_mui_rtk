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
import { useHolidayContext } from "@/lib/context/HolidayContext";
import { useGetHolidayQuery } from "@/lib/api/holidayApi";
import ModalHoliday from "./modal";
import AddFormHoliday from "./form";
import AlertlDelete from "./alertModalToDeleteHoliday";
import GridData from "@/app/components/DataGrid/dataGrid";
export default function HolidayList() {
  const { handleOpenModalHoliday } = useHolidayContext();
  const { data, isLoading, error } = useGetHolidayQuery("");
  const { setId, handleOpenAlertToDeleteHoliday } = useHolidayContext();
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
            handleOpenModalHoliday();
          }}
        />,
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
  // if (isLoading)
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         width: "100%",
  //         height: "500px",
  //       }}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Box>
  //   );
  return (
    <Box>
      <Container maxWidth="lg">
        <Typography variant="h5" component={"h4"}>
          Liste des jours fériés
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ marginRight: "5px", paddingX: "15px" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModalHoliday()}
          sx={{ marginTop: "20px" }}
        >
          Ajouter
        </Button>
        <Box>
          <div style={{ height: 650, width: "100%" }}>
            <GridData data={data} columns={columns} />
          </div>
        </Box>
        <ModalHoliday>
          <AddFormHoliday />
        </ModalHoliday>
        <AlertlDelete />
      </Container>
    </Box>
  );
}
