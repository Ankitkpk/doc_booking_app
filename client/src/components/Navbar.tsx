import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppContext } from '../hooks/useAppcontext';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {token , setToken}=useAppContext();
  const {userData}=useAppContext();
  const navigate=useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const Logout = () => {
  setToken('');
  localStorage.removeItem('atoken');
  toast.success('Logged out successfully!');
  setMenuOpen(false); 
  navigate('/login');
};
  return (
    <nav className="bg-white px-4 py-4 md:px-4 md:py-6">
      <div className="flex justify-between items-center">
        <img src={assets.logo} onClick={()=>navigate('/')} alt="Logo" className="h-10 w-auto" />
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/alldoctors"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }
            >
              All Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="hidden md:block">
         {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
          <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
          <div className="absolute top-10 right-0 font-medium text-gray-600 bg-gray-100 pt-14 text-base z-20 hidden group-hover:block">
            <div className='flex flex-col item-center gap-1 min-w-48'>
            <p  onClick={()=>navigate('/profile')}className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">My Profile</p>
            <p onClick={()=>navigate('/my-appointments')} className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">My Appointments</p>
            <p onClick={()=>Logout()}  className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">Logout</p>
            </div>
          </div>
         </div>
       ) : (
        <button onClick={()=>navigate('/login')} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Login
       </button>
        )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/alldoctors"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
            }
          >
            Contact
          </NavLink>

          {token  && userData ?  (
          <div className='flex items-center justify-center gap-2 cursor-pointer'>
          <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
          <div  className="absolute top-0 right-0 font-medium text-gray-600 pt-14 text-base z-20 hidden group-hover:block">
        <div>
         <p className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">My Profile</p>
         <p className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">My Appointments</p>
         <p onClick={()=>Logout()} className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">Logout</p>
        </div>
        </div>
         </div>
       ) : (
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Login
       </button>
        )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/*
let x = { name: "jhone" };
let y = x;
x.name = "Doe";
x = { name: "smith" };
console.log(y.name);
output=doe;
y is still pointing to the old objects//
*/