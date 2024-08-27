"use client";
import Holiday from "@/app/interface/holiday";
import { holidaySchema } from "@/utils/yup/shema";
import { useFormik } from "formik";
import React, { createContext, useContext, useState } from "react";
import {
  useAddHolidayMutation,
  useUpdateHolidayMutation,
} from "../api/holidayApi";
import dayjs from "dayjs";
const initialValues: Omit<Holiday, "id"> = {
  name: "",
  startDate: dayjs().toDate().toDateString(),
  endDate: dayjs().toDate().toDateString(),
};
const HolidayContext = createContext<any | null>(null);
function HolidayProvider({ children }: { children: React.ReactNode }) {
  const [updateHoliday, responseUpdateHoliday] = useUpdateHolidayMutation();
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
  // console.log("id ====> ", id);
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalHoliday() {
    setShowModal(false);
    formik.resetForm();
    setId("");
  }
  function handleOpenModalHoliday() {
    setShowModal(true);
  }
  async function onSubmit(values: any) {
    if (id) {
      const startDate = dayjs(values.startDate).toDate().toDateString();
      const endDate = dayjs(values.endDate).toDate().toDateString();
      const putHoliday = {
        name: values.name,
        startDate,
        endDate,
      };
      await updateHoliday({ updateHoliday: putHoliday, id });
      formik.resetForm();
      handleCloseModalHoliday();
    } else {
      const startDate = dayjs(values.startDate).toDate().toDateString();
      const endDate = dayjs(values.endDate).toDate().toDateString();
      const newHoliday = {
        name: values.name,
        startDate,
        endDate,
      };
      await addHoliday(newHoliday);
      formik.resetForm();
      handleCloseModalHoliday();
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: holidaySchema,
    onSubmit,
  });
  const [addHoliday, responseAddHoliday] = useAddHolidayMutation();
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
        handleOpenAlertToDeleteHoliday,
        handleCloseAlertToDeleteHoliday,
        showAlert,
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
