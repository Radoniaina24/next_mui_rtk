import { usePermissionContext } from "@/lib/context/PermissionContext";
import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function SubmitButtonPermission() {
  const { id, responseAddPermission, responseUpdatePermission } =
    usePermissionContext();
  const loading =
    responseAddPermission?.isLoading || responseUpdatePermission?.isLoading;
  return (
    <Button
      type="submit"
      variant="contained"
      color={id ? "primary" : "success"}
      disabled={loading ? true : false}
    >
      {loading ? (
        <Typography sx={{ display: "flex", gap: 2 }}>
          Enregistrer
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Typography>
      ) : (
        <Typography> {id ? "Modifier" : "Enregistrer"}</Typography>
      )}
    </Button>
  );
}
