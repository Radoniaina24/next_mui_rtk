"use client";
import Permission from "@/app/interface/permission";
import { permissionSchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useAddPermissionMutation,
  useUpdatePermissionMutation,
} from "../api/permissionApi";
const initialValues: Omit<Permission, "id"> = {
  event: "",
  dayCount: 1,
  voucher: "",
};
const PermissionContext = createContext<any | null>(null);
function PermissionProvider({ children }: { children: React.ReactNode }) {
  const [updatePermission, responseUpdatePermission] =
    useUpdatePermissionMutation();
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
  // console.log("id ====> ", id);
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalPermission() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalPermission() {
    setShowModal(true);
  }
  async function onSubmit(values: any) {
    if (id) {
      await updatePermission({ updatePermission: values, id });
      formik.resetForm();
      handleCloseModalPermission();
    } else {
      await addPermission(values);
      formik.resetForm();
      handleCloseModalPermission();
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: permissionSchema,
    onSubmit,
  });
  const [addPermission, responseAddPermission] = useAddPermissionMutation();
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
        handleOpenAlertToDeletePermission,
        handleCloseAlertToDeletePermission,
        showAlert,
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
