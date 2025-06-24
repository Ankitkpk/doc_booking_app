import React, { useEffect } from 'react';
import { useAdminContext } from '../../hooks/useAdminContext';
import { assets } from '../../assets/assets_admin/assets';

const AllAppointments: React.FC = () => {
  const { token, getAdminappointments, appointments, cancelAppointment } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAdminappointments();
    }
  }, [token]);

  return (
    <div className="w-full max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 text-center">All Appointments</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Date & Time</th>
              <th className="p-3 border-b">Patient</th>
              <th className="p-3 border-b">Doctor</th>
              <th className="p-3 border-b">Fees</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id} className="border-b">
                  <td className="p-3 text-gray-600">{index + 1}</td>

                  <td className="p-3">
                    <p className="text-gray-800 font-medium">{appointment.slotDate}</p>
                    <p className="text-xs text-gray-500">{appointment.slotTime}</p>
                  </td>

                  <td className="p-3 flex items-center gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={appointment.userData?.image}
                      alt={appointment.userData?.name || 'User'}
                    />
                    <span className="text-gray-700">{appointment.userData?.name}</span>
                  </td>

                  <td className="p-3 text-gray-700">
                    {appointment.doctorData?.name || '-'}
                  </td>

                  <td className="p-3 text-green-600 font-medium">₹{appointment.amount}</td>

                  <td className="p-3">
                    {appointment.isCancelled ? (
                      <span className="text-red-500 text-sm font-medium">Cancelled</span>
                    ) : (
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => cancelAppointment(appointment._id)}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
