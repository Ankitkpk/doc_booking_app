import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctor from '../components/RelatedDoctor';
import { useAppContext } from '../hooks/useAppcontext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Types } from 'mongoose';

interface AppointmentRequest {
  message: string;
  success: boolean;
  appointment: {
    docId: Types.ObjectId;
    userId: Types.ObjectId;
    slotTime: string;
    slotDate: string;
    userData: Record<string, any>;
    doctorData: Record<string, any>;
    amount: string;
    date: string;
  };
}

const Appointments: React.FC = () => {
  const { docId } = useParams();
  const { token, doctors, BackendUrl } = useAppContext();
  const [doctInfo, setDocInfo] = useState<typeof doctors[0] | null>(null);
  const [doctslots, setDoctSlots] = useState<{ dateTime: Date; time: string }[][]>([]);
  const [loading, setLoading] = useState(true);
  const [slotindex, setSlotIndex] = useState(0);
  const [slottime, setSlotTime] = useState('');
  const navigate = useNavigate();

  const daysOFweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getavailableSlot = async () => {
    setDoctSlots([]);
    setLoading(true);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      currentDate.setHours(10);
      currentDate.setMinutes(30);

      const endTime = new Date(currentDate);
      endTime.setHours(20);
      endTime.setMinutes(30);

      const timeslots: { dateTime: Date; time: string }[] = [];

      while (currentDate <= endTime) {
        const formatted = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).toLowerCase();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const slotDate = `${year}_${month}_${day}`;
        const slotTime = formatted;

        const bookedSlots = doctInfo?.slots_booked?.[slotDate] || [];
        const Is_slotavailable = !bookedSlots.includes(slotTime);

        if (Is_slotavailable) {
          timeslots.push({
            dateTime: new Date(currentDate),
            time: formatted,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDoctSlots((prev) => [...prev, timeslots]);
    }

    setLoading(false);
  };

  const BookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      navigate('/login');
      return;
    }

    try {
      if (!slottime) {
        toast.warn('Please select a time slot.');
        return;
      }

      const date = doctslots[slotindex]?.[0]?.dateTime;
      if (!date) return;

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const slotDate = `${year}_${month}_${day}`;

      const response = await axios.post<AppointmentRequest>(
        `${BackendUrl}/api/user/BookAppointment`,
        {
          docId,
          slotTime: slottime,
          slotDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success('Appointment booked successfully!');
        await getavailableSlot();
        setSlotTime('');
        navigate('/my-appointments');
      } else {
        toast.error(response.data.message || 'Booking failed');
      }
    } catch (error: any) {
      console.error('Appointment booking error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (docId && doctors.length > 0) {
      const doctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctor || null);
    }
  }, [docId, doctors]);

  useEffect(() => {
    if (doctInfo) getavailableSlot();
  }, [doctInfo]);

  if (!doctInfo) {
    return <div className="text-center mt-10 text-gray-500">Loading doctor information...</div>;
  }

  return (
    <div className="mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="bg-blue-500 flex justify-center items-center sm:w-2/5 rounded-lg">
          <img
            src={doctInfo.image}
            alt={doctInfo.name}
            className="w-64 h-64 object-contain rounded-lg"
          />
        </div>
        <div className="p-6 flex flex-col justify-center sm:w-3/5 border border-gray-300 rounded-lg bg-white">
          <h1 className="text-2xl font-semibold text-black mb-2">{doctInfo.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-sm text-gray-600">MBBS - {doctInfo.speciality}</p>
            <p className="p-2 rounded-full border border-gray-300 text-sm">{doctInfo.experience}</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-md font-medium text-gray-700">About</p>
            <img src={assets.info_icon} alt="info" className="w-4 h-4" />
          </div>
          <p className="text-sm text-black mb-4">{doctInfo.about}</p>
          <h2 className="text-lg font-bold text-gray-800">Appointment Fee: ${doctInfo.fees}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-y-5 mt-10 font-medium">
        <p className="text-2xl font-semibold px-4">Booking Slots</p>

        {loading ? (
          <p className="text-center text-gray-500">Loading available slots...</p>
        ) : (
          <>
            <div className="flex gap-4 overflow-x-auto px-4">
              {doctslots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center min-w-16 py-4 flex flex-col justify-center items-center rounded-full border cursor-pointer transition-all duration-200 ${
                    slotindex === index
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-black border-gray-300'
                  }`}
                >
                  <p>{item[0] && daysOFweek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 overflow-x-scroll px-4">
              {doctslots[slotindex]?.length > 0 ? (
                doctslots[slotindex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-4 py-2 rounded-md border text-sm whitespace-nowrap ${
                      slottime === item.time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
                  >
                    {item.time}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No slots available</p>
              )}
            </div>

            <button
              onClick={BookAppointment}
              className="flex items-center justify-center bg-blue-500 text-white text-sm text-center px-6 sm:px-8 py-3 rounded-full hover:bg-blue-600 w-full sm:w-1/2 md:w-1/4"
            >
              Book Appointment
            </button>
          </>
        )}
      </div>

      <RelatedDoctor className="mb-20" docId={docId} speciality={doctInfo.speciality} />
    </div>
  );
};

export default Appointments;