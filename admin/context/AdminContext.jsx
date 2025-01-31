import React, { createContext } from "react";
import { doctors } from '../assets/assets_frontend/assets.js';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const value = {
    
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;