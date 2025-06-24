import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AdminContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl: string;
  changeAvailability: (docId: string) => Promise<void>;
  getAdminappointments: () => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  getAdminPanelData: () => Promise<void>;
  doctors: Doctor[];
  totalDoctors: number;
  totalpatients: number;
  totalappointments: number;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  loading: boolean;
}

interface ChangeAvailabilityResponse {
  success: boolean;
  message: string;
}

interface Appointment {
  _id: string;
  slotTime: string;
  slotDate: string;
  userData: Record<string, any>;
  doctorData: Record<string, any>;
  isCancelled: boolean;
  amount: string;
  date: string;
}

interface Doctor {
  _id: string;
  name: string;
  image: string;
  available: boolean;
  speciality: string;
  slots_booked: Record<string, string[]>;
}

interface AdminAppointmentsResponse {
  success: boolean;
  message: string;
  appointments: Appointment[];
}

interface DoctorResponse {
  success: boolean;
  message: string;
  doctors: Doctor[];
}

interface AdminPanelResponse {
  success: boolean;
  dashData: {
    totalDoctors: Doctor[];
    allAppointments: Appointment[];
    totalPatients: number;
    latestAppointments: Appointment[];
  };
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [totalappointments, setTotalAppointments] = useState<number>(0);
  const [totalpatients, setTotalPatients] = useState<number>(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<DoctorResponse>(`${BackendUrl}/api/doctor/getAllDoctors`);
        if (response.data.success && Array.isArray(response.data.doctors)) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const changeAvailability = async (docId: string) => {
    try {
      const response = await axios.post<ChangeAvailabilityResponse>(
        `${BackendUrl}/api/doctor/changeAvailability`,
        { docId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setDoctors((prevDoctors) =>
        prevDoctors.map((doc) =>
          doc._id === docId ? { ...doc, available: !doc.available } : doc
        )
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change availability');
    }
  };

  const getAdminappointments = async () => {
    try {
      const response = await axios.get<AdminAppointmentsResponse>(
        `${BackendUrl}/api/admin/appointmentsAdmin`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setAppointments(response.data.appointments);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get admin appointments');
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.post<{ success: boolean; message: string }>(
        `${BackendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Appointment cancelled successfully');
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, isCancelled: true } : appt
        )
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

 const getAdminPanelData = async () => {
  try {
    const response = await axios.get<AdminPanelResponse>(
      `${BackendUrl}/api/admin/adminPanel`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data.dashData;
    console.log("Received doctors:", data.totalDoctors);

    setTotalPatients(data.totalPatients);
    setTotalAppointments(data.allAppointments.length);
    setTotalDoctors(data.totalDoctors.length); 
    setDoctors(data.totalDoctors);              
    setAppointments(data.allAppointments);

  } catch (error: any) {
    console.error(error);
  }
};


  const value: AdminContextType = {
    token,
    setToken,
    BackendUrl,
    changeAvailability,
    getAdminappointments,
    doctors,
    setDoctors,
    appointments,
    setAppointments,
    cancelAppointment,
    loading,
    totalDoctors,
    totalpatients,
    totalappointments,
    getAdminPanelData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
