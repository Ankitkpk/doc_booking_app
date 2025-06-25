import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';


interface Doctor {
  _id: string;
  name: string;
  image: string;
  available: boolean;
  slots_booked: Record<string, string[]>;
  speciality: string;
}

interface Address {
  line1: string;
  line2: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  address:Address;
  dob?:any;
  phone: string;
  gender: string;
  image: string;
}

interface userProfileResponse {
  success: true;
  message: string;
  user: User;
}

interface DoctorResponse {
  success: boolean;
  message: string;
  doctors: Doctor[];
}

interface AppContextType {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  BackendUrl: string;
  getUserProfileData: () => Promise<void>;
}

interface AppContextProviderProps {
  children: ReactNode;
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setToken] = useState<string>(() => localStorage.getItem('atoken') || '');
  const [userData, setUserData] = useState<User>({
  _id: '',
  name: '',
  email: '',
  phone: '',
  gender: '',
  dob: '',
  image: '',
  address: {
    line1: '',
    line2: '',
  },
});

  const BackendUrl = import.meta.env.VITE_BACKEND_URL as string;

 const getUserProfileData = async () => {
  try {
    const res = await axios.get<userProfileResponse>(`${BackendUrl}/api/user/getUserProfile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      setUserData(res.data.user); 
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    setUserData({
      _id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      image: '',
      address: { line1: '', line2: '' }
    }); 
  }
};
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
}, [BackendUrl]);



  const value: AppContextType = {
    doctors,
    setDoctors,
    token,
    setToken,
    userData,
    setUserData,
    BackendUrl,
    getUserProfileData,
  };

  
useEffect(() => {
  if (token) {
    getUserProfileData();
  } else {
    setUserData({
      _id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      image: '',
      address: { line1: '', line2: '' }
    });
  }
}, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
