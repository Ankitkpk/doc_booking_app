import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";

const SpeciallityMenu = () => {
  return (
    <div className="text-center py-8">
      <p className="text-4xl font-bold mb-4">Find By Speciality</p>
      <p className="text-gray-600 mb-8">
        Simply browse through our list of trusted doctors <br />
        Schedule your appointment hassle-free
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {specialityData.map((speciality, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full shadow-md">
              <img
                src={speciality.image}
                alt={speciality.speciality}
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="mt-4 text-gray-700 text-lg">{speciality.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciallityMenu;
