import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppcontext';

const TopDoctors: React.FC = () => {
  const {doctors}=useAppContext();
  console.log(doctors);
  const navigate=useNavigate();
  return (
    <div className="text-center py-10">
      <p className="text-4xl font-bold text-gray-800 mb-4">Top Doctors</p>
      <p className="text-gray-600 mb-10">
        Browse through our list of trusted doctors <br />
        Schedule your appointment hassle-free
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {doctors.slice(0, 10).map((doctor, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 w-full max-w-md mx-auto"
            onClick={()=>navigate(`/appointment/${doctor._id}`)}
          >
            <div className="p-6 bg-blue-50 w-full flex justify-center items-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-40 h-60 object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center text-green-500 text-md font-semibold pt-4 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
              Available
            </div>

            <div className="px-6 py-4 text-center">
              <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
              <p className="text-sm text-gray-600 mt-1">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => {
  navigate('/doctors');
  scrollTo(0, 0);
}} className="mt-10 bg-gray-50 rounded-full py-4 px-14">
        More
      </button>
    </div>
  );
};

export default TopDoctors;
