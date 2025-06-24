import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../hooks/useAdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DoctorList: React.FC = () => {
  const { BackendUrl,changeAvailability,doctors,setDoctors,loading,} = useAdminContext();
  
 
  if (loading) {
    return <p className="text-center text-gray-500">Loading doctors...</p>;
  }

  if (doctors.length === 0) {
    return <p className="text-center text-red-500">No doctors found.</p>;
  }

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100">
      <p className="text-2xl font-semibold mb-6 px-2 text-gray-800">All Doctors</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-2 w-full py-9 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 cursor-pointer"

          >
            <div className="bg-blue-50 w-full p-4 flex justify-center items-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-40 h-48 object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-green-500 text-md font-semibold pt-4">
              <input onClick={()=>changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} readOnly />
              <p>available</p>
            </div>

            <div className="px-4 py-4 text-center">
              <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
              <p className="text-sm text-gray-600 mt-1">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
