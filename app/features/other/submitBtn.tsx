import { useOtherContext } from "@/lib/context/OtherContext";
import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function SubmitButtonOther() {
  const { id, responseAddOther, responseUpdateOther } = useOtherContext();
  const loading = responseAddOther?.isLoading || responseUpdateOther?.isLoading;
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
