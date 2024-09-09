"use client";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  Typography,
} from "@mui/material";
import React from "react";
import { useOtherContext } from "@/lib/context/OtherContext";
import {
  otherAPI,
  useDeleteOtherMutation,
  useGetOtherQuery,
} from "@/lib/api/otherApi";
import ModalOther from "./modal";
import AddFormOther from "./form";
import AlertlDeleteOther from "./alertModalToDeleteOther";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import NumbersIcon from "@mui/icons-material/Numbers";
export default function OtherList() {
  const { handleOpenModalOther } = useOtherContext();
  const { data: other, isLoading, error } = useGetOtherQuery("");
  const { handleDeleteOther, responseDeleteOther } = useOtherContext();
  console.log("data => ", other);
  //const otherParameter = other?.data[0];
  const weeks = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  // const week = other?.data[0]?.dayOff.map((item: any) => weeks[item]);
  const table = [0, 1, 2, 3, 4, 5];
  if (isLoading)
    return (
      <Box sx={{ marginTop: "45px" }}>
        <List>
          {table.map((index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Skeleton variant="rounded" width={25} height={25} />
              </ListItemIcon>
              <ListItemText>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={250}
                />
              </ListItemText>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={60} />
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ display: "flex", justifyContent: "end", marginTop: "1.5rem" }}
        >
          <Skeleton variant="rounded" width={85} height={30} />
        </Box>
      </Box>
    );
  return "";
  // <Box sx={{ marginTop: "45px" }}>
  //   <Container maxWidth="lg">
  //     <Box sx={{ marginTop: "2rem" }}>
  //       <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
  //         <List>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <CalendarMonthIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Nombre de jours de travail" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={
  //                     otherParameter
  //                       ? otherParameter?.workDay + " jour(s)"
  //                       : " - "
  //                   }
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <AccessTimeIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Nombre d'heures de travail" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={
  //                     otherParameter
  //                       ? otherParameter?.workHour + " jour(s)"
  //                       : " - "
  //                   }
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <CalendarTodayIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Droit de congé mensuel" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={
  //                     otherParameter
  //                       ? otherParameter?.monthlyLeave + " jour(s)"
  //                       : " - "
  //                   }
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <VerticalAlignTopIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Accumulation max" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={
  //                     otherParameter
  //                       ? otherParameter?.accruate + " jour(s)"
  //                       : " - "
  //                   }
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <FamilyRestroomIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Jour de repos" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={otherParameter ? week.join(" - ") : " - "}
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //           <ListItem disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <NumbersIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Coefficient" />
  //               {isLoading ? (
  //                 <Skeleton
  //                   variant="text"
  //                   sx={{ fontSize: "1rem", width: 70 }}
  //                 />
  //               ) : (
  //                 <ListItemText
  //                   sx={{ textAlign: "end" }}
  //                   primary={
  //                     otherParameter ? otherParameter?.coefficient : " - "
  //                   }
  //                 />
  //               )}
  //             </ListItemButton>
  //           </ListItem>
  //         </List>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "end",
  //             marginTop: "1.5rem",
  //           }}
  //         >
  //           {otherParameter ? (
  //             <Button
  //               size="small"
  //               color="error"
  //               variant="contained"
  //               onClick={() => handleDeleteOther(otherParameter?.id)}
  //               disabled={responseDeleteOther?.isLoading}
  //             >
  //               {responseDeleteOther?.isLoading ? "Loading..." : " Supprimer"}
  //             </Button>
  //           ) : (
  //             ""
  //           )}
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color={other?.data.length > 0 ? "warning" : "success"}
  //             onClick={handleOpenModalOther}
  //             sx={{
  //               marginRight: "5px",
  //               paddingX: "15px",
  //               marginLeft: "0.5rem",
  //             }}
  //             startIcon={
  //               other?.data.length > 0 ? "" : <AddCircleOutlineIcon />
  //             }
  //             disabled={responseDeleteOther?.isLoading}
  //           >
  //             {other?.data.length > 0 ? "Modifier" : "Ajouter"}
  //           </Button>
  //         </Box>
  //       </Box>
  //     </Box>
  //     <ModalOther>
  //       <AddFormOther />
  //     </ModalOther>
  //     <AlertlDeleteOther />
  //   </Container>
  // </Box>
}
