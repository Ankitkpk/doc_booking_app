import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext.jsx';

const TopDoctor = () => {
  const navigate = useNavigate();
  const {doctors}=useContext(AppContext);
  const handleCardClick = (id) => {
    navigate(`/appointment/${id}`);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Top Doctors To Book</h1>
      <p className="text-center mb-6">Simply browse through our extensive network of trusted doctors.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0,8).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => handleCardClick(doctor._id)}
            className="block shadow-lg rounded-lg hover:scale-105 transition-transform bg-blue-100 h-full cursor-pointer"
          >
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-24 object-cover rounded-full mx-auto mb-4"
            />
            <div className="text-center bg-white w-full">
              <p className="text-green-500 p-2">Available</p>
              <h3 className="text-xl font-semibold text-gray-700 p-2">{doctor.name}</h3>
              <p className="text-gray-500 p-2">{doctor.speciality}</p>
            </div>
          </div>
          
        ))}
        <button onClick={()=>{navigate("/doctors"); scrollTo(0,0)}}  className="flex items-center justify-center w-24 mt-6 px-6 py-3 bg-gray-100 text-black rounded-full">
        More    
        </button>
      </div>
  </div>
  );
};

export default TopDoctor;