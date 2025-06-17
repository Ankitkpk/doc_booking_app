import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
const Banner: React.FC = () => {
const navigate=useNavigate();
  return (
    <div className="bg-blue-400 px-6 md:px-10 lg:px-12 mb-10 rounded-lg flex flex-col md:flex-row items-center justify-evenly">
      <div className="text-white mb-6 md:mb-0 max-w-md py-8">
        <h2 className="text md:text-4xl font-semibold mb-2">Book Appointment</h2>
        <p className="text-4xl mb-4">with 100+ trusted doctors</p>
        <button onClick={()=>navigate('/login')} className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-blue-100 transition duration-200">
          Create Account
        </button>
      </div>
      <div className="hidden md:block w-1/2 lg:w-[370px]">
        <img  className='w-full' src={assets.appointment_img} alt="Appointment Illustration"/>
      </div>
    </div>
  );
};

export default Banner;
