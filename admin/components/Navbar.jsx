import React, { useContext } from "react";
import {assets} from '../src/assets/assets_admin/assets'
import { AdminContext } from "../context/adminContext"; 

const Navbar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
      <div>
        <img src={assets.admin_logo} alt="Admin Logo" />
        <p>{aToken ? "Admin" : "Doctor"}</p>
      </div>
       <button>Logout</button>
    </div>
  );
};

export default Navbar;
