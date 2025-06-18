import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AdminContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  BackendUrl: string;
  changeAvailability: (docId: string) => Promise<void>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  loading: boolean;
}

interface ChangeAvailabilityResponse {
  success: boolean;
  message: string;
}

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

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
  children: ReactNode;
}

const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

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
      toast.error(error.response?.data?.message || "Failed to change availability");
    }
  };

  const value: AdminContextType = {
    token,
    setToken,
    BackendUrl,
    changeAvailability,
    doctors,
    setDoctors,
    loading,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
