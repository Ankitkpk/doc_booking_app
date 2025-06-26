import React, { createContext, useState } from 'react';
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
  dashData: DashboardData | null;
  setDashData: React.Dispatch<React.SetStateAction<DashboardData | null>>;
  getAppointments: () => Promise<void>;
  CompleteAppointment:(appointmentId:string)=>Promise<void>;
  CancelAppointment:(appointmentId:string)=>Promise<void>;
  getDoctorDashboardData:()=>Promise<void>
  profileData: Doctor | null;
  setProfileData: React.Dispatch<React.SetStateAction<Doctor | null>>;
  getProfileData: () => Promise<void>;
}

interface DashboardData {
  earning: number;
  appointments: number;
  patients: number;
  latestAppointments: Appointment[];
}

interface DoctorDashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
   address:{
    line1:string,
    line2:string
  };
  image: string;
  fees: number;
  speciality: string;
  available: boolean;
  degree:string;
  about:string;
  expirence:string

}
export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);
interface DoctorContextProviderProps {
  children: ReactNode;
}
const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;
const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({ children }) => {
const [dtoken, setDToken] = useState<string>(() => localStorage.getItem('dtoken') || '');
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [dashData, setDashData] = useState<DashboardData | null>(null);
const [profileData, setProfileData] = useState<Doctor | null>(null);

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
        toast.success(response.data.message);
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

const getDoctorDashboardData = async () => {
  try {
    const response = await axios.get<DoctorDashboardResponse>(
      `${BackendUrl}/api/doctor/doctorDashboard`,
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setDashData(response.data.data)
    } else {
      toast.error("Failed to cancel appointment.");
    }
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    toast.error("Something went wrong while featching dashboard data.");
  }
};

const getProfileData = async () => {
  try {
    const response = await axios.get<{ success: boolean; message: string; doctor: Doctor }>(
      `${BackendUrl}/api/doctor/getDoctorProfile`,
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setProfileData(response.data.doctor as Doctor);
    } else {
      toast.error("Failed to fetch profile data.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    toast.error("Something went wrong while fetching the profile.");
  }
};
 

  const value: DoctorContextType = {
    dtoken,
    setDToken,
    setDashData,
    dashData,
    BackendUrl,
    appointments,
    getAppointments,
    CompleteAppointment,
    CancelAppointment,
    getDoctorDashboardData,
     profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
