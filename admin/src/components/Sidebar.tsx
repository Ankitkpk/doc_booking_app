import React, { useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { useAdminContext } from '../hooks/useAdminContext';
import { NavLink } from 'react-router-dom';
import { useDoctorContext } from '../hooks/useDoctorContext';

const Sidebar: React.FC = () => {
  const { token } = useAdminContext();
  const { dtoken } = useDoctorContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 text-gray-700 hover:text-blue-600 ${
      isActive ? 'underline decoration-blue-600 underline-offset-2 text-black' : ''
    }`;

  if (!token && !dtoken) return null; 

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-gray-700 hover:text-blue-600 z-50 relative"
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-300 px-8 py-6 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:z-auto`}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end md:hidden mb-4">
          <button onClick={toggleSidebar} className="text-gray-700 hover:text-blue-600">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Admin Links */}
        {token && (
          <ul className="flex flex-col gap-y-6 text-gray-700">
            <li>
              <NavLink to="/admin-dashboard" className={navLinkClasses}>
                <FaTachometerAlt size={18} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-appointments" className={navLinkClasses}>
                <FaCalendarAlt size={18} />
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-doctors" className={navLinkClasses}>
                <FaUserMd size={18} />
                <span>Add Doctor</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-list" className={navLinkClasses}>
                <IoIosPeople size={22} />
                <span>Doctor List</span>
              </NavLink>
            </li>
          </ul>
        )}

        {/* Doctor Links */}
        {dtoken && (
          <ul className="flex flex-col gap-y-6 text-gray-700">
            <li>
              <NavLink to="/doctor-dashboard" className={navLinkClasses}>
                <FaTachometerAlt size={18} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-appointment" className={navLinkClasses}>
                <FaCalendarAlt size={18} />
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-profile" className={navLinkClasses}>
                <FaUser size={18} />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
