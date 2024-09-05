"use client";
import Mail from "@/app/interface/mail";
import { mailSchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import {
  useAddMailMutation,
  useDeleteMailMutation,
  useUpdateMailMutation,
} from "../api/mailApi";
import { useSnackbar } from "./SnackbarContext";
const initialValues: Omit<Mail, "id"> = {
  name: "",
  cc: [],
  subject: "",
  body: "",
};
const MailContext = createContext<any | null>(null);
function MailProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addMail, responseAddMail] = useAddMailMutation();
  const [updateMail, responseUpdateMail] = useUpdateMailMutation();
  const [deleteMail, responseDeleteMail] = useDeleteMailMutation();
  async function handleCreateMail(newMail: any) {
    try {
      await addMail(newMail).unwrap();
      showSnackbar("Mail créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du mail", "error");
    }
  }
  async function handleUpdateMail(updatePermi: any, id: any) {
    try {
      await updateMail({ updateMail: updatePermi, id }).unwrap();
      showSnackbar("Mail mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du mail", "error");
    }
  }
  async function handleDeleteMail(id: any) {
    try {
      await deleteMail(id).unwrap();
      showSnackbar("Mail supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du mail", "error");
    }
  }
  // Alert Mail on delete mail
  const [showAlert, setShowAlert] = useState(false);
  function handleOpenAlertToDeleteMail() {
    setShowAlert(true);
  }
  function handleCloseAlertToDeleteMail() {
    setShowAlert(false);
    setId("");
  }
  // recupération de l'id du mail a editer ou a supprimmer
  const [id, setId] = useState("");

  //Modale mail
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalMail() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalMail() {
    setShowModal(true);
  }
  // function pour la soumission du formulaire
  async function onSubmit(values: any) {
    if (id) {
      const newCC = values.cc.join(",");
      const valuesEdit = { ...values, cc: newCC };
      await handleUpdateMail(valuesEdit, id);
      formik.resetForm();
      handleCloseModalMail();
    } else {
      const newCC = values.cc.join(",");
      const valuesEdit = { ...values, cc: newCC };
      await handleCreateMail(valuesEdit);
      formik.resetForm();
      handleCloseModalMail();
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: mailSchema,
    onSubmit,
  });
  return (
    <MailContext.Provider
      value={{
        showModal,
        handleCloseModalMail,
        handleOpenModalMail,
        formik,
        responseAddMail,
        id,
        setId,
        showAlert,
        handleOpenAlertToDeleteMail,
        handleCloseAlertToDeleteMail,
        handleDeleteMail,
        responseUpdateMail,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
function useMailContext() {
  const context = useContext(MailContext);
  if (context === undefined)
    throw new Error("MailContext was used outside the MailProvider");
  return context;
}
export { MailProvider, useMailContext };
