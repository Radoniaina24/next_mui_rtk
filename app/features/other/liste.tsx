"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import React from "react";
import { useOtherContext } from "@/lib/context/OtherContext";
import { useDeleteOtherMutation, useGetOtherQuery } from "@/lib/api/otherApi";
import ModalOther from "./modal";
import AddFormOther from "./form";
import AlertlDeleteOther from "./alertModalToDeleteOther";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import NumbersIcon from "@mui/icons-material/Numbers";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
export default function OtherList() {
  const { handleOpenModalOther } = useOtherContext();
  const { data: other, isLoading, error } = useGetOtherQuery("");
  const { handleOpenAlertToDeleteOther } = useOtherContext();
  const [deleteOther, responseDelete] = useDeleteOtherMutation("");
  const otherParameter = other?.data[0];
  const weeks = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const week = other?.data[0]?.dayOff.map((item: any) => weeks[item]);
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
  // if (error?.data)
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "400px",
  //       }}
  //     >
  //       <Typography color="error" variant="h5" component={"p"}>
  //         Mauvaise requête
  //       </Typography>
  //     </Box>
  //   );
  // if (error) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "400px",
  //       }}
  //     >
  //       <Typography color="error" variant="h5" component={"p"}>
  //         Network Error
  //       </Typography>
  //     </Box>
  //   );
  // }
  return (
    <Box sx={{ marginTop: "45px" }}>
      <Container maxWidth="lg">
        <Box sx={{ marginTop: "2rem" }}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nombre de jours de travail" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        otherParameter
                          ? otherParameter?.workDay + " jour(s)"
                          : " - "
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nombre d'heures de travail" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        otherParameter
                          ? otherParameter?.workHour + " jour(s)"
                          : " - "
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText primary="Droit de congé mensuel" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        otherParameter
                          ? otherParameter?.monthlyLeave + " jour(s)"
                          : " - "
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <VerticalAlignTopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accumulation max" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        otherParameter
                          ? otherParameter?.accruate + " jour(s)"
                          : " - "
                      }
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FamilyRestroomIcon />
                  </ListItemIcon>
                  <ListItemText primary="Jour de repos" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={otherParameter ? week.join(" - ") : " - "}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NumbersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Coefficient" />
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 70 }}
                    />
                  ) : (
                    <ListItemText
                      sx={{ textAlign: "end" }}
                      primary={
                        otherParameter ? otherParameter?.coefficient : " - "
                      }
                    />
                  )}
                  <ListItemText
                    sx={{ textAlign: "end" }}
                    primary={
                      otherParameter ? otherParameter?.coefficient : " - "
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: "1.5rem",
              }}
            >
              {otherParameter ? (
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => deleteOther(otherParameter?.id)}
                  disabled={responseDelete?.isLoading}
                >
                  {responseDelete?.isLoading ? "Loading..." : " Supprimer"}
                </Button>
              ) : (
                ""
              )}
              <Button
                size="small"
                variant="contained"
                color={other?.data.length > 0 ? "warning" : "success"}
                onClick={handleOpenModalOther}
                sx={{ marginLeft: "0.5rem" }}
              >
                {other?.data.length > 0 ? "Modifier" : "Ajouter"}
              </Button>
            </Box>
            ;
          </Box>
        </Box>
        <ModalOther>
          <AddFormOther />
        </ModalOther>
        <AlertlDeleteOther />
      </Container>
    </Box>
  );
}
