import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const Speciality: React.FC = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center text-center px-4 md:px-10 lg:px-20 py-10"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Find by Speciality
      </h1>
      <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-10">
        Simply browse through our extensive list of trusted doctors,
        <br />
        schedule your appointment hassle-free.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full justify-items-center">
        {specialityData.map(({ speciality, image }, index) => (
          <Link
            to={`/doctors/${speciality}`}
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg hover:shadow-md transition"
          >
            <img
              src={image}
              alt={speciality}
              className="w-20 h-20 object-contain mb-4"
            />
            <p className="text-gray-700 text-black font-medium">{speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
