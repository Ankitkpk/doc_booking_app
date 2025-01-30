import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
      <img
        src={assets.logo}
        alt="Logo"
        className="h-8 w-auto cursor-pointer"
        onClick={() => navigate('/')}
      />
      
      <ul className="hidden md:flex items-start gap-5 font-medium">
     {['Home', 'All Doctors', 'Appointment', 'Contact'].map((item, index) => (
      <NavLink 
      key={index} 
      to={`/${item.toLowerCase().replace(" ", "")}`} 
      className="group flex flex-col items-center text-black"
    >
      <li>{item}</li>
      <hr className="w-full border-t-2 border-transparent group-hover:border-blue-500" />
    </NavLink>
  ))}
</ul>
     
      {token ? (
        <div className="flex gap-1 cursor-pointer group relative">
          <img src={assets.profile_pic} className="w-10 rounded-full" alt="Profile" />
          <img src={assets.dropdown_icon} alt="Dropdown Icon" />
  
          <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md font-medium hidden group-hover:block">
            <div className="flex flex-col p-4 bg-stone-100">
              <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer" onClick={() => navigate('/my-profile')}>Profile</p>
              <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer" onClick={() => navigate('/my-appointments')}>My Appointments</p>
              <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer" onClick={() => navigate('/logout')}>Logout</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        </div>
      )}

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenu(!menu)}
          className="text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {menu && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          {['Home', 'All Doctors', 'Appointment', 'Contact'].map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="block px-4 py-2 group"
              onClick={() => setMenu(false)}
            >
              <li>{item}</li>
              <hr className="border border-transparent group-hover:border-blue-500" />
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;