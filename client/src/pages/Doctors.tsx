import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppcontext';

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Cardiologist',
];

const Doctors: React.FC = () => {
  const { speciality } = useParams();
  const { doctors } = useAppContext();
  const [filterDoc, setFilterDoc] = useState<typeof doctors>([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Browse through the doctor specialists
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-8 ">
        {SPECIALITIES.map((spec) => (
          <button
            key={spec}
            onClick={() => navigate(`/doctors/${spec}`)}
            className={`px-4 py-2 rounded-full border ${
              spec === speciality
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800 hover:bg-blue-100'
            }`}
          >
            {spec}
          </button>
        ))}
        <button
          onClick={() => navigate('/alldoctors')}
          className={`px-4 py-2 rounded-full border ${
            !speciality
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-800 hover:bg-blue-100'
          }`}
        >
          All
        </button>
      </div>
  <div className="w-full flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {filterDoc.map((doctor, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 w-full max-w-md cursor-pointer"
          onClick={() => navigate(`/appointment/${doctor._id}`)}
        >
          <div className="p-4 bg-blue-50 w-full flex justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-36 h-52 object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center text-green-500 text-sm font-semibold pt-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
            Available
          </div>

          <div className="px-4 py-3 text-center">
            <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
            <p className="text-sm text-gray-600 mt-1">{doctor.speciality}</p>
          </div>
        </div>
      ))}
    </div>
 
</div>
</div>
  );
};

export default Doctors;
