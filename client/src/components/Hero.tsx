import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap rounded-lg bg-blue-600 mt-10 px-6 md:px-10 lg:px-20 items-center">
      <div className="flex flex-col md:w-1/2">
        <p className="mt-10 text-3xl md:text-4xl text-white font-bold text-gray-800 leading-snug">
          Book Appointment <br />
          With Trusted Doctors
        </p>

        <div className="flex items-center space-x-4">
          <img src={assets.group_profiles} alt="group profiles" className="w-25 h-25 object-contain" />
          <p className="text-gray-600 text-sm text-base text-white">
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a href="speciality" className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-2 rounded-full w-fit hover:bg-gray-100 transition">
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4 text-white" />
        </a>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={assets.header_img} alt="header" className="w-full " />
      </div>
    </div>
  );
};

export default Hero;
