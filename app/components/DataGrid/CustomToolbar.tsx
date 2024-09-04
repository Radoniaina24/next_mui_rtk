import { Box, Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
export default function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: "space-between",
        // backgroundColor: "#f5f5f5",
        padding: "8px",
        marginY: "1rem",
      }}
    >
      {/* <GridToolbarColumnsButton /> */}
      {/* <GridToolbarExport /> */}

      <GridToolbarFilterButton />

      <GridToolbarQuickFilter
        placeholder="recherche ..."
        sx={{ paddingLeft: "1rem" }}
      />
    </GridToolbarContainer>
  );
}
