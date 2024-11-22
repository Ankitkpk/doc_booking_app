import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets.js';
import { Link } from "react-router-dom";

const SpeciallityMenu = () => {
  return (
    <div id="speciality" className='flex flex-col items-center justify-center mt-12 p-4'>
      <h1 className='text-3xl'>Find by Speciality</h1>
      <p className='text-xl p-8'>
        Simply browse through our extensive list of trusted doctors <br />
        and schedule your appointment hassle-free.
      </p>
      <div className="flex items-center justify-center gap-4 p-4 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link 
            key={index} 
            onClick={() => scrollTo(0, 0)} 
            to={`/doctors/${item.speciality}`} 
            className='cursor-pointer flex-shrink hover:translate-y-[-10px] transition-all duration-500'
          >
            <img src={item.image} alt={item.speciality} className="sm:w-24 p-2" />
            <h3>{item.speciality}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpeciallityMenu;
