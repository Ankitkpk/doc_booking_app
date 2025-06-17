import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { doctors } from '../assets/assets_frontend/assets';


interface DoctorContextType {
  doctors: typeof doctors;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl: string;
}


export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;


const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const value: DoctorContextType = {
    doctors,
    token,
    setToken,
    BackendUrl
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
