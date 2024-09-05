"use client";
import Other from "@/app/interface/other";
import { otherSchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import {
  useAddOtherMutation,
  useDeleteOtherMutation,
  useUpdateOtherMutation,
} from "../api/otherApi";
import { useSnackbar } from "./SnackbarContext";
const initialValues: Omit<Other, "id"> = {
  workDay: "0",
  workHour: "0",
  monthlyLeave: "0",
  accruate: "0",
  dayOff: [0],
  coefficient: "0",
  isFormule: false,
};
const OtherContext = createContext<any | null>(null);
function OtherProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addOther, responseAddOther] = useAddOtherMutation();
  const [updateOther, responseUpdateOther] = useUpdateOtherMutation();
  const [deleteOther, responseDeleteOther] = useDeleteOtherMutation();
  async function handleCreateOther(newOther: any) {
    try {
      await addOther(newOther).unwrap();
      showSnackbar("Other créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du other", "error");
    }
  }
  async function handleUpdateOther(updatePermi: any) {
    try {
      await updateOther(updatePermi).unwrap();
      showSnackbar("Other mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du other", "error");
    }
  }
  async function handleDeleteOther(id: any) {
    try {
      await deleteOther(id).unwrap();
      showSnackbar("Other supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du other", "error");
    }
  }
  // Alert Other on delete other
  const [showAlert, setShowAlert] = useState(false);
  function handleOpenAlertToDeleteOther() {
    setShowAlert(true);
  }
  function handleCloseAlertToDeleteOther() {
    setShowAlert(false);
    setId("");
  }
  // recupération de l'id du other a editer ou a supprimmer
  const [id, setId] = useState("");

  //Modale other
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalOther() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalOther() {
    setShowModal(true);
  }
  async function onSubmit(values: any) {
    await handleUpdateOther(values);
    formik.resetForm();
    handleCloseModalOther();
  }
  const formik = useFormik({
    initialValues,
    validationSchema: otherSchema,
    onSubmit,
  });
  return (
    <OtherContext.Provider
      value={{
        showModal,
        handleCloseModalOther,
        handleOpenModalOther,
        formik,
        responseAddOther,
        id,
        setId,
        handleOpenAlertToDeleteOther,
        handleCloseAlertToDeleteOther,
        showAlert,
        responseUpdateOther,
        handleDeleteOther,
        responseDeleteOther,
      }}
    >
      {children}
    </OtherContext.Provider>
  );
}
function useOtherContext() {
  const context = useContext(OtherContext);
  if (context === undefined)
    throw new Error("OtherContext was used outside the OtherProvider");
  return context;
}
export { OtherProvider, useOtherContext };
