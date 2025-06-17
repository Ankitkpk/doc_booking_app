import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const appointments = [
  {
    doctor: 'Dr. Richard James',
    specialty: 'General Physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    image: assets.appointment_img,
  },
  {
    doctor: 'Dr. Richard James',
    specialty: 'General Physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    image: assets.appointment_img,
  },
  {
    doctor: 'Dr. Richard James',
    specialty: 'General Physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    image: assets.appointment_img,
  },
];

const AppointmentCard: React.FC<{
  doctor: string;
  specialty: string;
  address: string;
  dateTime: string;
  image: string;
}> = ({ doctor, specialty, address, dateTime, image }) => (
  <div className="flex flex-col items-center md:flex-row items-start gap-4 p-2">
   <div className="w-full sm:w-40 sm:h-40 bg-blue-100  flex items-center justify-center">
  <img
    src={image}
    alt={doctor}
    className="w-full h-full  object-contain"
  />
</div>
    
    <div className="flex-1 ">
      <div className='space-y-1 '>
      <p className="text-base sm:text-xl font-semibold">{doctor}</p>
      <p className="text-sm text-gray-600">{specialty}</p>
      <p className="text-sm text-gray-600">{address}</p>
      <p className="text-sm font-medium mt-2">Date & Time: {dateTime}</p>
      </div>
      
      <div className="mt-4 flex flex-col text-xm sm:flex-row gap-3 sm:gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">
          Pay here
        </button>
        <button className="bg-white text-black border px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto">
          Cancel Appointment
        </button>
      </div>
    </div>
  </div>
);

const MyAppointment: React.FC = () => {
  return (
    <div className="p-4 space-y-4 sm:p-6">
      <p className="text-xl sm:text-2xl font-bold mb-2">My Appointments</p>
      <hr className="mb-6 border-t border-gray-300" />
      {appointments.map((appt, index) => (
        <div>
          <AppointmentCard key={index} {...appt} />
          <hr className="mt-2 border-t border-gray-300" />
        </div>
       
      ))}
       
    </div>
   
  );
};

export default MyAppointment;
