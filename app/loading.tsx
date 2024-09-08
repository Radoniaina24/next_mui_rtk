import { Container, Box, CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ mb: 3 }} />
        <Typography variant="h4" sx={{ mb: 1 }}>
          Chargement...
        </Typography>
        <Typography variant="body1">
          Veuillez patienter, le contenu est en cours de chargement.
        </Typography>
      </Box>
    </Container>
  );
}
