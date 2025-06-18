import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// ---------------------------
// Interfaces
// ---------------------------
interface Doctor {
  _id: string;
  name: string;
  image: string;
  available: boolean;
  speciality: string;
}

interface DoctorResponse {
  success: boolean;
  message: string;
  doctors: Doctor[];
}

interface AppContextType {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  BackendUrl: string;
}

interface AppContextProviderProps {
  children: ReactNode;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<DoctorResponse>(`${BackendUrl}/api/doctor/getAllDoctors`);
        if (response.data.success && Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);
 console.log(doctors);
  const value: AppContextType = {
    doctors,
    setDoctors,
    BackendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
