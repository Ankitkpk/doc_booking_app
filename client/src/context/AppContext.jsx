import React, { createContext, useState } from "react";
import { doctors } from '../assets/assets_frontend/assets.js';

export const AppContext = createContext();
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const AppContextProvider = (props) => {
  //from login api from backend we are sending token//
  const [token,setToken]=useState('');
  const value = {
    doctors,
    token,
    setToken,
    BackendUrl
  };

 return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;