import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../hooks/useAppcontext';
import { assets } from '../assets/assets_frontend/assets';

export interface AppointmentHistoryResponse {
  success: boolean;
  total: number;
  page: number;
  pages: number;
  data: Appointment[];
}

interface Appointment {
  _id: string;
  slotDate: string;
  slotTime: string;
  isCancelled: boolean;
  docId: {
    image: string;
    name: string;
    speciality: string;
    address: {
      line1: string;
      line2: string;
    };
    createdAt: string;
  };
}

const months = ["", "JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

const formatSlotDate = (slotDate: string, slotTime: string): string => {
  const [year, monthStr, day] = slotDate.split('_');
  const monthIndex = Number(monthStr);
  return `${year} ${months[monthIndex]} ${day} at ${slotTime}`;
};

const AppointmentCard: React.FC<{
  doctor: string;
  specialty: string;
  address: string;
  dateTime: string;
  image: string;
  isCancelled: boolean;
}> = ({ doctor, specialty, address, dateTime, image, isCancelled }) => (
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
      <div className="mt-4 flex text-sm">
        <button className="bg-white text-red-500 border border-gray-400 px-4 py-2 rounded sm:w-auto" disabled>
          Cancelled
        </button>
      </div>
    </div>
  </div>
);

const AppointmentHistory: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { BackendUrl, token } = useAppContext();
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get<AppointmentHistoryResponse>(
        `${BackendUrl}/api/user/getAppointment-history?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(res.data.data);
      setPages(res.data.pages);
      setPage(res.data.page);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAppointments(page);
  }, [page]);

  return (
    <div className="p-4 space-y-4 sm:p-6 text-gray-800">
      <p className="text-xl sm:text-2xl font-bold mb-2">Appointment History</p>
      <hr className="mb-6 border-t border-gray-300" />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No cancelled appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id}>
            <AppointmentCard
              doctor={appt.docId.name}
              specialty={appt.docId.speciality}
              address={`${appt.docId.address.line1}, ${appt.docId.address.line2}`}
              dateTime={formatSlotDate(appt.slotDate, appt.slotTime)}
              image={appt.docId.image || assets.group_profiles}
              isCancelled={appt.isCancelled}
            />
            <hr className="mt-2 border-t border-gray-300" />
          </div>
        ))
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded ${
                p === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === pages}
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
