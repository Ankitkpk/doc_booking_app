import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { Menu, X } from 'lucide-react';
import { useAdminContext } from '../hooks/useAdminContext';

const Navbar: React.FC = () => {
  const { token, setToken } = useAdminContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');

  };

  return (
   <div >
    <nav className="flex items-center justify-between  px-4 sm:px-8  py-4 bg-white">
      <div className="flex items-center space-x-4">
        <img src={assets.admin_logo} alt="logo" className="h-8" />
        <p className="text-md font-semibold text-gray-500 py-1 px-4 rounded-full border">{token ? 'Admin' : 'Doctor'}</p>
      </div>

      <div className="hidden sm:flex space-x-6">
        {token && (
          <button
            onClick={handleLogout}
            className="text-white bg-blue-600 rounded-full px-6 py-2 font-medium text-md"
          >
            Logout
          </button>
        )}
      </div>

      <div className="sm:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
    <hr className="border-gray-300" />
  </div>
)
}

export default Navbar;
