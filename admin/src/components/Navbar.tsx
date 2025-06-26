import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { Menu, X } from 'lucide-react';
import { useAdminContext } from '../hooks/useAdminContext';
import { useDoctorContext } from '../hooks/useDoctorContext';

const Navbar: React.FC = () => {
  const { token, setToken } = useAdminContext();
  const { dtoken, setDToken } = useDoctorContext(); 

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate=useNavigate();
  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
    localStorage.removeItem('dtoken'); // optional
    setToken('');
    setDToken('');
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white">
        <div className="flex items-center space-x-4">
          <img src={assets.admin_logo} alt="logo" className="h-8" />
          <p className="text-md font-semibold text-gray-500 py-1 px-4 rounded-full border">
            {token ? 'Admin' : dtoken ? 'Doctor' : ''}
          </p>
        </div>

        <div className="hidden sm:flex space-x-6">
          {(token || dtoken) && (
            <button
              onClick={handleLogout}
              className="text-white bg-blue-600 rounded-full px-6 py-2 font-medium text-md"
            >
              Logout
            </button>
          )}
        </div>

        <div className="sm:hidden">
          {(token || dtoken) && (
            <button
              onClick={handleLogout}
              className="text-white bg-blue-600 rounded-full px-4 py-2 font-medium text-sm "
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Navbar
