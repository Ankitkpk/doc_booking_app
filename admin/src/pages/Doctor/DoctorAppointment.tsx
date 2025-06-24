import React, { useEffect, useState } from 'react';
import { useDoctorContext } from '../../hooks/useDoctorContext';
const DoctorAppointment: React.FC = () => {
const {dtoken,getAppointments}=useDoctorContext();

useEffect(()=>{
  if(dtoken){
    getAppointments();
  } 
},[dtoken])
  return (
    <div>

    </div>
  );
}
  export default DoctorAppointment;

