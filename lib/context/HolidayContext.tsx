"use client";
import Holiday from "@/app/interface/holiday";
import { holidaySchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import {
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
} from "../api/holidayApi";
import { useSnackbar } from "./SnackbarContext";
import dayjs from "dayjs";
const initialValues: Omit<Holiday, "id"> = {
  name: "",
  date: dayjs().toDate().toDateString(),
  dayPart: 0,
};
const HolidayContext = createContext<any | null>(null);
function HolidayProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addHoliday, responseAddHoliday] = useAddHolidayMutation();
  const [updateHoliday, responseUpdateHoliday] = useUpdateHolidayMutation();
  const [deleteHoliday, responseDeleteHoliday] = useDeleteHolidayMutation();
  async function handleCreateHoliday(newHoliday: any) {
    try {
      await addHoliday(newHoliday).unwrap();
      showSnackbar("Holiday créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du holiday", "error");
    }
  }
  async function handleUpdateHoliday(updatePermi: any, id: any) {
    try {
      await updateHoliday({ updateHoliday: updatePermi, id }).unwrap();
      showSnackbar("Holiday mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du holiday", "error");
    }
  }
  async function handleDeleteHoliday(id: any) {
    try {
      await deleteHoliday(id).unwrap();
      showSnackbar("Holiday supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du holiday", "error");
    }
  }
  // Alert Holiday on delete holiday
  const [showAlert, setShowAlert] = useState(false);
  function handleOpenAlertToDeleteHoliday() {
    setShowAlert(true);
  }
  function handleCloseAlertToDeleteHoliday() {
    setShowAlert(false);
    setId("");
  }
  // recupération de l'id du holiday a editer ou a supprimmer
  const [id, setId] = useState("");

  //Modale holiday
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalHoliday() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalHoliday() {
    setShowModal(true);
  }
  // function pour la soumission du formulaire
  async function onSubmit(values: any) {
    if (id) {
      await handleUpdateHoliday(values, id);
      formik.resetForm();
      handleCloseModalHoliday();
    } else {
      const dateString = dayjs(values.date).toDate().toLocaleDateString();
      const newHoliday = {
        ...values,
        dayPart: parseInt(values.dayPart),
        date: dateString,
      };
      await handleCreateHoliday(newHoliday);
      formik.resetForm();
      handleCloseModalHoliday();
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: holidaySchema,
    onSubmit,
  });
  return (
    <HolidayContext.Provider
      value={{
        showModal,
        handleCloseModalHoliday,
        handleOpenModalHoliday,
        formik,
        responseAddHoliday,
        id,
        setId,
        showAlert,
        handleOpenAlertToDeleteHoliday,
        handleCloseAlertToDeleteHoliday,
        handleDeleteHoliday,
        responseUpdateHoliday,
      }}
    >
      {children}
    </HolidayContext.Provider>
  );
}
function useHolidayContext() {
  const context = useContext(HolidayContext);
  if (context === undefined)
    throw new Error("HolidayContext was used outside the HolidayProvider");
  return context;
}
export { HolidayProvider, useHolidayContext };
