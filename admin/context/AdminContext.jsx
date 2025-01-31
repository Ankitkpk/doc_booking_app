import React, { createContext, useState } from "react";


export const AdminContext = createContext();

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminContextProvider = ({ children }) => {
  const [AToken, setAToken] = useState("");

  const value = { AToken, setAToken, BackendUrl };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
