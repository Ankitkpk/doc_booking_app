import { useContext } from 'react';
import { DoctorContext } from '../context/Doctorcontext';

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctorContext must be used within an DoctoeContextProvider');
  }
  return context;
};