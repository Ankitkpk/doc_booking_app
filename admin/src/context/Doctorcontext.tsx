import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

 interface UserData {
  name: string;
  email: string;
  image: string;
}

 interface DoctorData {
  name: string;
}

 interface Appointment {
  _id: string;
  slotDate: string;
  slotTime: string;
  userData: UserData;
  doctorData: DoctorData;
  amount: number;
  isCancelled: boolean;
}

export interface DoctorAppointmentsResponse {
  success: boolean;
  message: string;
  appointments: Appointment[];
}
interface DoctorContextType {
  dtoken: string;
  setDToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl: string;
  appointments: Appointment[];
  getAppointments: () => Promise<void>;
}

export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({ children }) => {
  const [dtoken, setDToken] = useState<string>(() => localStorage.getItem('dtoken') || '');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getAppointments = async () => {
    try {
      const response = await axios.get<DoctorAppointmentsResponse>(`${BackendUrl}/api/doctor/getDoctorAppointments`, {
        headers: {
          Authorization: `Bearer ${dtoken}`,
          "Content-Type": "application/json"
        },
      });
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    if (dtoken) getAppointments();
  }, [dtoken]);

  const value: DoctorContextType = {
    dtoken,
    setDToken,
    BackendUrl,
    appointments,
    getAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
