import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className='mt-6 ml-10 mr-10'>
      <p className='text-xl'>My Appointments</p>
      <div>
        {doctors.slice(0, 2).map((doctor, index) => (
          <div key={doctor._id} className="border p-4 my-2">
            <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full" />
            <div>
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Speciality:</strong> {doctor.speciality}</p>
              <p><strong>Address:</strong> {doctor.address.line1}, {doctor.address.line2}</p>
              <p><strong>Date & Time:</strong>25 July 2024 | 8:30</p>
            </div>
            <div className="flex gap-4 mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
