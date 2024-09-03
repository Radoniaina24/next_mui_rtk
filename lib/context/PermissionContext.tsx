"use client";
import Permission from "@/app/interface/permission";
import { permissionSchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import {
  useAddPermissionMutation,
  useDeletePermissionMutation,
  useUpdatePermissionMutation,
} from "../api/permissionApi";
import { useSnackbar } from "./SnackbarContext";
const initialValues: Omit<Permission, "id"> = {
  event: "",
  dayCount: 1,
  voucher: "",
};
const PermissionContext = createContext<any | null>(null);
function PermissionProvider({ children }: { children: React.ReactNode }) {
  // utilisation du context snackbar
  const { showSnackbar } = useSnackbar();
  // CRUD RTK Query
  const [addPermission, responseAddPermission] = useAddPermissionMutation();
  const [updatePermission, responseUpdatePermission] =
    useUpdatePermissionMutation();
  const [deletePermission, responseDeletePermission] =
    useDeletePermissionMutation();
  async function handleCreatePermission(newPermission: any) {
    try {
      await addPermission(newPermission).unwrap();
      showSnackbar("Permission créé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la creation du permission", "error");
    }
  }
  async function handleUpdatePermission(updatePermi: any, id: any) {
    try {
      await updatePermission({ updatePermission: updatePermi, id }).unwrap();
      showSnackbar("Permission mis à jour avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la mise à jour du permission", "error");
    }
  }
  async function handleDeletePermission(id: any) {
    try {
      await deletePermission(id).unwrap();
      showSnackbar("Permission supprimé avec succès", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la suppression du permission", "error");
    }
  }
  // Alert Permission on delete permission
  const [showAlert, setShowAlert] = useState(false);
  function handleOpenAlertToDeletePermission() {
    setShowAlert(true);
  }
  function handleCloseAlertToDeletePermission() {
    setShowAlert(false);
    setId("");
  }
  // recupération de l'id du permission a editer ou a supprimmer
  const [id, setId] = useState("");

  //Modale permission
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalPermission() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalPermission() {
    setShowModal(true);
  }
  // function pour la soumission du formulaire
  async function onSubmit(values: any) {
    if (id) {
      await handleUpdatePermission(values, id);
      formik.resetForm();
      handleCloseModalPermission();
    } else {
      await handleCreatePermission(values);
      formik.resetForm();
      handleCloseModalPermission();
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: permissionSchema,
    onSubmit,
  });
  return (
    <PermissionContext.Provider
      value={{
        showModal,
        handleCloseModalPermission,
        handleOpenModalPermission,
        formik,
        responseAddPermission,
        id,
        setId,
        showAlert,
        handleOpenAlertToDeletePermission,
        handleCloseAlertToDeletePermission,
        handleDeletePermission,
        responseUpdatePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}
function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (context === undefined)
    throw new Error(
      "PermissionContext was used outside the PermissionProvider"
    );
  return context;
}
export { PermissionProvider, usePermissionContext };
