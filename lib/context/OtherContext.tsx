"use client";
import Other from "@/app/interface/other";
import { otherSchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import { useAddOtherMutation, useUpdateOtherMutation } from "../api/otherApi";
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
  const [updateOther, responseUpdateOther] = useUpdateOtherMutation();
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
    await updateOther(values);
    formik.resetForm();
    handleCloseModalOther();
  }
  updateOther;
  const formik = useFormik({
    initialValues,
    validationSchema: otherSchema,
    onSubmit,
  });
  const [addOther, responseAddOther] = useAddOtherMutation();
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
