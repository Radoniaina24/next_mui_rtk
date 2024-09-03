import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React from "react";

export default function GridData({
  data,
  columns,
}: //   isLoading,
{
  data: any;
  columns: GridColDef[];
}) {
  return (
    <DataGrid
      rows={data?.data}
      columns={columns}
      slots={{ toolbar: GridToolbar }}
      disableDensitySelector
      slotProps={{
        pagination: {
          labelRowsPerPage: "Ligne par page",
        },
        toolbar: {
          showQuickFilter: true,
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
      //   pageSizeOptions={[10, 50, 100]}
      //   onPaginationModelChange={(params) => {
      //     console.log(params.pageSize);
      //   }}
      //   pagination={true}
    />
  );
}
