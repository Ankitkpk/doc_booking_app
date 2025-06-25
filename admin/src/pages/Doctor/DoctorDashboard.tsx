import React, { useEffect } from 'react';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorDashboard: React.FC = () => {
  const { dashData, getDoctorDashboardData, dtoken, CancelAppointment,CompleteAppointment} = useDoctorContext();

  useEffect(() => {
    const fetchDashboard = async () => {
      if (dtoken) {
        await getDoctorDashboardData();
      }
    };
    fetchDashboard();
  }, [dtoken]);

  return (
    <div className="m-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-80">
          <div className="flex items-center gap-3">
            <img src={assets.earning_icon} alt="Earning" className="w-16" />
            <div className="flex flex-col">
              <p className="text-gray-600">Doctors</p>
              <h2 className="text-2xl font-bold">{dashData?.earning}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 max-w-80">
          <div className="flex items-center gap-4">
            <img src={assets.appointments_icon} alt="Appointments" className="w-16" />
            <div className="flex flex-col">
              <p className="text-gray-600">Appointments</p>
              <h2 className="text-2xl font-bold">{dashData?.appointments}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 max-w-80">
          <div className="flex items-center gap-4">
            <img src={assets.patients_icon} alt="Patients" className="w-16" />
            <div className="flex flex-col">
              <p className="text-gray-600">Patients</p>
              <h2 className="text-2xl font-bold">{dashData?.patients}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-2 py-6">
        <div className="flex items-center gap-2 mb-4">
          <img src={assets.list_icon} alt="List Icon" />
          <h1 className="text-2xl font-semibold text-gray-800">Latest Appointments</h1>
        </div>

        <div className="bg-white rounded shadow-sm text-sm max-h-[80vh] overflow-y-auto border border-gray-100">
          <div className="hidden sm:grid grid-cols-6 py-3 px-4 border-b font-medium bg-gray-100 text-gray-700">
            <p>#</p>
            <p>Date & Time</p>
            <p>Patient</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {dashData?.latestAppointments?.slice(0, 5)?.map((appointment, index) => (
            <div
              key={appointment._id}
              className={`grid sm:grid-cols-6 grid-cols-1 gap-y-2 py-6 px-10 border-b border-gray-100 items-center ${
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
              <div className="flex items-center">
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
          )) ?? (
            <div className="p-4 text-gray-500 text-center">No appointments found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
