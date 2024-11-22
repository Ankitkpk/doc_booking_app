import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { GoArrowRight } from "react-icons/go";


const Header = () => {
    
  return (
    <div className="flex items-center justify-between  bg-blue-500  ml-8 mr-8 rounded-[15px]"> 
      <div className="flex justify-center flex-col ml-10">
        <p className="font-bold text-5xl text-white">Book Appointment</p>
        <p className="text-5xl p-5">With Trusted Doctors</p>
        <div className="flex items-center mt-2 ">
          <img src={assets.group_profiles} alt="Group Profiles" />
          <p className="text-sm text-white p-3">
          Simply browse through our extensive list of trusted doctors <br />
          and schedule your appointment hassle-free.
         </p>
        </div>
        <div className=' ml-7 p-5' >   
         
        <span>
      <button href="#speciality" class="bg-white border border-white text-black font-semibold py-4 px-4 rounded-full flex items-center hover:bg-gray-100 hover:border-gray-200">
        <span>Book Appointment</span>
        <GoArrowRight className="ml-2" />
      </button>
    </span>
      </div>
      </div>
      <div className="flex items-center w-1/2">
        <img src={assets.header_img} alt="" className='mr-5' />
      </div>
    </div>
  );
};

export default Header;
