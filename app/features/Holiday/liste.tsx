"use client";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHolidayContext } from "@/lib/context/HolidayContext";
import { useGetHolidayQuery } from "@/lib/api/holidayApi";
import ModalHoliday from "./modal";
import AddFormHoliday from "./form";
import AlertlDeleteHoliday from "./alertModalToDeleteHoliday";
import Loading from "@/app/components/progress/loading";
export default function HolidayList() {
  const { handleOpenModalHoliday } = useHolidayContext();
  const { data, isLoading, error } = useGetHolidayQuery("");
  const { setId, handleOpenAlertToDeleteHoliday } = useHolidayContext();
  const columns: GridColDef[] = [
    { field: "name", headerName: "Jour férié", width: 300 },
    { field: "startDate", headerName: "Date de début", width: 300 },
    { field: "endDate", headerName: "Date de fin", width: 250 },
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
  if (error?.data)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <Typography color="error" variant="h5" component={"p"}>
          Mauvaise requête
        </Typography>
      </Box>
    );
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <Typography color="error" variant="h5" component={"p"}>
          Network Error
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ marginTop: "45px" }}>
      <Container maxWidth="lg">
        <Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpenModalHoliday}
          >
            Ajouter
          </Button>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={data?.data}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              disableDensitySelector
              loading={isLoading}
              slotProps={{
                pagination: {
                  labelRowsPerPage: "Ligne par page",
                },
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              localeText={{
                noRowsLabel:
                  "Aucun résultat trouvé. Veuillez verifier votre serveur.",
                noResultsOverlayLabel: "Aucun résultat trouvé",
                toolbarExportCSV: "Télécharger en format CSV",
                toolbarExportPrint: "Imprimer",
                toolbarFilters: "Filtres",
                toolbarColumns: "Colonne",
                //Filter Operators text
                filterOperatorContains: "contient",
                filterOperatorEquals: "est égal",
                filterOperatorStartsWith: "commence par",
                filterOperatorEndsWith: "se termine par",
                filterOperatorIs: "est",
                filterOperatorNot: "n'est pas",
                filterOperatorAfter: "c'est après",
                filterOperatorOnOrAfter: "est le ou après",
                filterOperatorBefore: "est avant",
                filterOperatorOnOrBefore: "est le ou avant",
                filterOperatorIsEmpty: "est vide",
                filterOperatorIsNotEmpty: "n'est pas vide",
                filterOperatorIsAnyOf: "est l'un des",
                filterPanelColumns: "Colonne",
                filterPanelInputLabel: "Valeur",
                filterPanelOperator: "Operation",
              }}
              rowSelection={false}
              pageSizeOptions={[10, 50, 100]}
              onPaginationModelChange={(params) => {
                console.log(params.pageSize);
              }}
              pagination={true}
            />
          </div>
        </Box>
        <ModalHoliday>
          <AddFormHoliday />
        </ModalHoliday>
        <AlertlDeleteHoliday />
      </Container>
    </Box>
  );
}
