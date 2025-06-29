import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';





interface AppContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl: string;
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const value: AppContextType = {
    token,
    setToken,
    BackendUrl
 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
