import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  isCompleted:boolean
}

 interface DoctorAppointmentsResponse {
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
  CompleteAppointment:(appointmentId:string)=>Promise<void>;
  CancelAppointment:(appointmentId:string)=>Promise<void>;
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

const CancelAppointment = async (appointmentId: string) => {
  try {
    const response = await axios.post<{ success: boolean; message: string }>(
      `${BackendUrl}/api/doctor/appointment-cancelled`,
      { appointmentId },
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      //chnage state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, isCancelled: true } : appt
        )
      );
    } else {
      toast.error("Failed to cancel appointment.");
    }
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    toast.error("Something went wrong while cancelling the appointment.");
  }
};
const CompleteAppointment = async (appointmentId: string) => {
  try {
    const response = await axios.post<{ success: boolean; message: string }>(
      `${BackendUrl}/api/doctor/appointment-complete`,
      { appointmentId },
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      //change the state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, isCompleted: true } : appt
        )
      );
    } else {
      toast.error("Failed to complete appointment.");
    }
  } catch (error) {
    toast.error("Something went wrong while completing the appointment.");
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
    CompleteAppointment,
    CancelAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
