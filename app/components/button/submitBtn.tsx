import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function SubmitButton({ response }: any) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="success"
      disabled={response?.isLoading ? true : false}
    >
      {response?.isLoading ? (
        <Typography sx={{ display: "flex", gap: 2 }}>
          Enregistrer
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Typography>
      ) : (
        "Enregistrer"
      )}
    </Button>
  );
}
