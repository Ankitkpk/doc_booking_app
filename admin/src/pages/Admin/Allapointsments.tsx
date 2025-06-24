import React, { useEffect } from 'react';
import { useAdminContext } from '../../hooks/useAdminContext';
import { assets } from '../../assets/assets_admin/assets';

const AllAppointments: React.FC = () => {
  const { token, getAdminappointments,appointments,cancelAppointment } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAdminappointments();
    }
  }, [token]);

  return (
    <div className="w-full max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">All Appointments</h1>

      <div className="bg-white rounded shadow-sm text-sm max-h-[80vh] overflow-y-auto border border-gray-100">
        <div className="hidden sm:grid grid-cols-6 py-3 px-4 border-b font-medium bg-gray-100 text-gray-700">
          <p>#</p>
          <p>Date & Time</p>
          <p>Patient</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments?.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className={`grid sm:grid-cols-6 grid-cols-1 gap-y-2 py-4 px-4 border-b border-gray-100 items-center ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >

              <div className="sm:block font-semibold text-gray-600">
                <span className="sm:hidden font-medium text-gray-500"># </span>
                {index + 1}
              </div>
              <div>
                <span className="sm:hidden font-medium text-gray-500">Date & Time: </span>
                <p className="font-medium">{appointment.slotDate}</p>
                <p className="text-gray-500 text-xs">{appointment.slotTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={appointment.userData?.image}
                  alt={appointment.userData?.name || 'User'}
                />
                <p className="truncate">{appointment.userData?.name}</p>
              </div>
              <p>
                <span className="sm:hidden font-medium text-gray-500">Doctor: </span>
                {appointment.doctorData?.name || '-'}
              </p>
              <p className="font-medium text-green-700">
                <span className="sm:hidden font-medium text-gray-500">Fees: </span>
                ₹{appointment.amount}
              </p>
              <div className='flex items-center'>
                {appointment.isCancelled ? (
                  <p className="text-red-500 font-medium">Cancelled</p>
                ) : (
                  <img
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                    className="w-10 h-10 cursor-pointer"
                    onClick={()=>cancelAppointment(appointment._id)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-center">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
