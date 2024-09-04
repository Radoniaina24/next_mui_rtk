import {
  Box,
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function SkeletonLoadingList() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Evenement</TableCell>
            <TableCell>Nombre de jour</TableCell>
            <TableCell>Pièce justificative</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Leanne Graham</TableCell>
            <TableCell>Sincere@april.biz</TableCell>
            <TableCell>1-770-736-8031 x56442</TableCell>
            <TableCell>hildegard.org</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ervin Howell</TableCell>
            <TableCell>Shanna@melissa.tv</TableCell>
            <TableCell>010-692-6593 x09125</TableCell>
            <TableCell>anastasia.net</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// <Box>
//   <Container maxWidth="lg">
//     <Typography variant="h5" component={"h4"}>
//       Liste des permissions
//     </Typography>
//     <Skeleton variant="recta"/>
//   </Container>
// </Box>
