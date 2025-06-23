import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Doctor {
  name: string;
  speciality: string;
  image: string;
  address: {
    line1: string;
    line2: string;
  };
}
interface Appointment {
  _id: string;
  docId: Doctor;
  slotTime: string;
  slotDate: string;
  isCancelled: boolean;
}


const MyAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { BackendUrl, token } = useAppContext();
  //month index always start from zero//
  const months=["","JAN","FEB","MARCH","APR","MAY","JUN","JULY","AUG","SEP","OCT","NOV","DEC"];

  const SlotDateformatted=(slotDate:string,slotTime:string):string=>{
    let dateArray=slotDate.split('_');
    let year=dateArray[0];
    let monthIndex=Number(dateArray[1]);
    let day=dateArray[2];
    return year + "  " + months[monthIndex] + " " + day + " " + " At " + slotTime;
  }

  const MyAppointments = async () => {
    try {
      const res = await axios.get<{ success: boolean; appointments: Appointment[] }>(
        `${BackendUrl}/api/user/getAppointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setAppointments(res.data.appointments);
      } else {
        toast.error('Failed to load appointments');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
const CancelAppointment = async (appointmentId:string) => {
  try {
    console.log(appointmentId);
    const response = await axios.post<{ success: boolean;message:string }>(
        `${BackendUrl}/api/user/cancelAppointment`,
        {appointmentId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (response.data.success) {
      toast.success("Appointment cancelled successfully.");
      // Optionally refetch appointments or update UI
    } else {
      toast.error(response.data.message || "Failed to cancel appointment.");
    }
  } catch (error) {
    console.error("Cancel error:", error);
    toast.error("Something went wrong while cancelling the appointment.");
  }
};
  useEffect(() => {
    if(token){
    MyAppointments();
    }
  }, [token]);
 
  const AppointmentCard: React.FC<{
  doctor: string;
  specialty: string;
  address: string;
  dateTime: string;
  image: string;
  appointmentId: string;
  isCancelled: boolean;
}> = ({ doctor, specialty, address, dateTime, image, appointmentId, isCancelled }) => (
  <div className="flex flex-col items-center md:flex-row items-start gap-4 p-2">
    <div className="w-full sm:w-40 sm:h-40 bg-blue-100 flex items-center justify-center">
      <img src={image} alt={doctor} className="w-full h-full object-contain" />
    </div>
    <div className="flex-1">
      <div className="space-y-1">
        <p className="text-base sm:text-xl font-semibold">{doctor}</p>
        <p className="text-sm text-gray-600">{specialty}</p>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-sm font-medium mt-2">Date & Time: {dateTime}</p>
      </div>
      <div className="mt-4 flex flex-col text-sm sm:flex-row gap-3 sm:gap-4">
        {!isCancelled && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">
            Pay here
          </button>
        )}

        {!isCancelled ? (
          <button
            onClick={() => CancelAppointment(appointmentId)}
            className="bg-white text-black border px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
          >
            Cancel Appointment
          </button>
        ) : (
          <button className="bg-white text-red-500  border border-gray-400 px-4 py-2 rounded sm:w-auto">Cancelled</button>
        )}
      </div>
    </div>
  </div>
);

  return (
    <div className="p-4 space-y-4 sm:p-6">
      <p className="text-xl sm:text-2xl font-bold mb-2">My Appointments</p>
      <hr className="mb-6 border-t border-gray-300" />
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id}>
            <AppointmentCard
              doctor={appt.docId.name}
              specialty={appt.docId.speciality}
              address={`${appt.docId.address.line1}, ${appt.docId.address.line2}`}
              dateTime={SlotDateformatted(appt.slotDate,appt.slotTime)}
              image={appt.docId.image}
              appointmentId={appt._id}
              isCancelled={appt.isCancelled}
            />
            <hr className="mt-2 border-t border-gray-300" />
          </div>
        ))
      )}
      
    </div>
  );
};

export default MyAppointment;
