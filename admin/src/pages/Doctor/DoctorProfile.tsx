
import React, { useEffect, useState } from 'react';
import { useDoctorContext } from '../../hooks/useDoctorContext';

const DoctorProfile: React.FC = () => {
 const {profileData,setProfileData,getProfileData,dtoken}=useDoctorContext();
 useEffect(()=>{
  if(dtoken){
    getProfileData();
  }
 },[dtoken])
 console.log(profileData);
  return (
   <div>
    
   </div>
  );
};

export default DoctorProfile;
