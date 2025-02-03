import React, { createContext, useState } from "react";


export const AdminContext = createContext();

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('Atoken')? localStorage.getItem('Atoken'):'');

  const value = { aToken, setAToken, BackendUrl };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
