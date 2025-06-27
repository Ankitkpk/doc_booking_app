import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppContext } from '../hooks/useAppcontext';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const { token, setToken, userData } = useAppContext();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const Logout = () => {
    setToken('');
    localStorage.removeItem('atoken');
    toast.success('Logged out successfully!');
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white px-4 py-4 md:px-8">
      <div className="flex justify-between items-center">
        <img src={assets.logo} onClick={() => navigate('/')} alt="Logo" className="h-10 w-auto cursor-pointer" />

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
         <NavLink to="/" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            Home
          </NavLink>
          <NavLink to="/alldoctors" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            All Doctors
          </NavLink>
           <a
           href="https://doc-booking-app-yz2o.vercel.app/"
           onClick={toggleMenu}
           className="text-gray-700 hover:text-blue-600"
           target="_blank"
           rel="noopener noreferrer"
           >
          Admin
          </a>
          <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            Contact
          </NavLink>
        </ul>

        {/* Desktop Profile / Login */}
        <div className="hidden md:block relative">
          {token && userData ? (
            <div className="group flex items-center gap-2 cursor-pointer relative">
              <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
              <div className="absolute top-10 right-0 font-medium text-gray-600 bg-white shadow-md rounded-md z-30 hidden group-hover:block min-w-48">
                <div className="flex flex-col px-3 py-2">
                  <p onClick={() => navigate('/profile')} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">My Appointments</p>
                  <p onClick={() => navigate('/appointment-history')} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Appointment History</p>
                  <p onClick={Logout} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          <NavLink to="/" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            Home
          </NavLink>
          <NavLink to="/alldoctors" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            All Doctors
          </NavLink>
           <a
           href="https://doc-booking-app-yz2o.vercel.app/"
           onClick={toggleMenu}
           className="text-gray-700 hover:text-blue-600"
           target="_blank"
           rel="noopener noreferrer"
           >
          Admin
          </a>
          <NavLink to="/contact" onClick={toggleMenu} className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}>
            Contact
          </NavLink>

          {/* Mobile Profile Section */}
          {token && userData ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>
                <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="Profile" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
              </div>
              {mobileProfileOpen && (
                <div className="mt-2 bg-white shadow-md rounded-md py-2 px-4">
                  <p onClick={() => { navigate('/profile'); toggleMenu(); }} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">My Profile</p>
                  <p onClick={() => { navigate('/my-appointments'); toggleMenu(); }} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">My Appointments</p>
                  <p onClick={() => { navigate('/appointment-history'); toggleMenu(); }} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Appointment History</p>
                  <p onClick={() => { Logout(); toggleMenu(); }} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => { navigate('/login'); toggleMenu(); }} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
