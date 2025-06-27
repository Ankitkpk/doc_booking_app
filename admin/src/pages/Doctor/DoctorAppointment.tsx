import React, { useEffect, useState } from 'react';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointment: React.FC = () => {
  const { dtoken, getAppointments, appointments,CancelAppointment,CompleteAppointment } = useDoctorContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (dtoken) {
        try {
          await getAppointments();
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        } finally {
          setLoading(false);
        }
      }
    };
 let result=fetchAppointments();
 console.log(result);
  }, [dtoken]);


  return (
    <div className="w-full max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800"> Appointments</h1>

      <div className="bg-white rounded-xl shadow-md text-sm max-h-[80vh] overflow-y-auto border border-gray-200">
        <div className="hidden sm:grid grid-cols-6 py-3 px-4 border-b font-semibold bg-gray-100 text-gray-700">
          <p>#</p>
          <p>Date & Time</p>
          <p>Patient</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading appointments...</div>
        ) : appointments?.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className={`grid sm:grid-cols-6 grid-cols-2 gap-y-2 py-4 px-4 border-b border-gray-100 items-center ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="font-semibold text-gray-600">
                <span className="sm:hidden font-medium text-gray-500"># </span>
                {index + 1}
              </div>

              <div>
                <span className="sm:hidden font-medium text-gray-500">Date & Time: </span>
                <p className="font-medium text-gray-800">{appointment.slotDate}</p>
                <p className="text-gray-500 text-xs">{appointment.slotTime}</p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  className="w-15 h-13 rounded-full object-cover shadow"
                  src={appointment.userData?.image}
                  alt={appointment.userData?.name || 'User'}
                />
                <p className="whitespace-normal break-words truncate font-medium text-gray-700">{appointment.userData?.name}</p>
              </div>

              <p className="text-gray-800">
                <span className="sm:hidden font-medium text-gray-500">Doctor: </span>
                {appointment.doctorData?.name || '-'}
              </p>

              <p className="font-semibold text-green-600">
                <span className="sm:hidden font-medium text-gray-500">Fees: </span>
                ₹{appointment.amount}
              </p>

              <div className="flex items-center gap-3">
                {
                   appointment.isCancelled?<p className='whitespace-normal break-words text-red-500'>cancelled</p>
                  :appointment.isCompleted?<p className='whitespace-normal break-words text-green-600'> complete</p>
                  :<>
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      onClick={() =>CancelAppointment(appointment._id)}
                    />
                    <img
                      src={assets.tick_icon}
                      alt="Confirmed"
                      title="Confirmed"
                      className="w-8 h-8"
                      onClick={()=>CompleteAppointment(appointment._id)}
                    />
                  </>
                }
                 </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No appointments found for today.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
