import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  MuiEvent,
} from "@mui/x-data-grid";
import React from "react";
import CustomToolbar from "./CustomToolbar";
export default function GridData({
  data,
  columns,
  count,
  onLimit,
  onPage,
  pageState,
  pageLimit,
}: //   isLoading,
{
  data: any;
  columns: GridColDef[];
  count?: number;
  onLimit: any;
  onPage: any;
  pageState: any;
  pageLimit: any;
}) {
  function handleChangeLimit(params: any) {
    onLimit(params.pageSize);
    if (params.page === 0) {
      onPage(1);
    } else {
      onPage(params.page + 1);
    }
  }
  return (
    <DataGrid
      sx={{
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        // "&.MuiDataGrid-root": { border },
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
          fontSize: "15px",
        },
        " & .MuiDataGrid-row--borderBottom": {
          backgroundColor: "#f5f5f5 !important",
          //color: "white",
        },
        "& .MuiDataGrid-sortIcon": {
          opacity: "inherit !important",
        },
        "& .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
        "& .MuiDataGrid-cell:hover": {
          cursor: "pointer",
        },
      }}
      rows={data?.data}
      columns={columns}
      slots={{ toolbar: CustomToolbar }}
      disableDensitySelector
      slotProps={{
        pagination: {
          labelRowsPerPage: "Ligne par page",
        },
      }}
      localeText={{
        noRowsLabel: "Aucun résultat trouvé.",
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
      //   rowSelection={false}

      pageSizeOptions={[5, 10, 20, 50, 100]}
      onPaginationModelChange={(params) => {
        handleChangeLimit(params);
      }}
      initialState={{
        ...data.initialState,
        pagination: {
          paginationModel: { pageSize: pageLimit, page: pageState - 1 },
        },
      }}
      paginationMode="server"
      pagination={true}
      rowCount={count}
    />
  );
}
