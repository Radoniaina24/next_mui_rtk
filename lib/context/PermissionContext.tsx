"use client";
import Permission from "@/app/interface/permission";
import React, { createContext, useContext, useEffect, useState } from "react";
const initialValues: Omit<Permission, "id"> = {
  event: "",
  dayCount: 1,
  voucher: "",
};
const PermissionContext = createContext<any | null>(null);
function PermissionProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  function handleCloseModalPermission() {
    setShowModal(false);
  }
  function handleOpenModalHPermission() {
    setShowModal(true);
  }

  return (
    <PermissionContext.Provider
      value={{
        showModal,
        setShowModal,
        handleCloseModalPermission,
        handleOpenModalHPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}
function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (context === undefined)
    throw new Error("PermissionContext was used outside the EventsProvider");
  return context;
}
export { PermissionProvider, usePermissionContext };
