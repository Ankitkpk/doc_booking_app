import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';


interface AdminContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl:string

}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;
const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(()=> localStorage.getItem('token') || '');

  const value: AdminContextType = {
    token,
    setToken,
    BackendUrl
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
