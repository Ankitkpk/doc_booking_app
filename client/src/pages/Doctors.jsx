import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  console.log(speciality);

  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    const applyFilter = () => {
      if (speciality) {
        setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
      } else {
        setFilterDoc(doctors);
      }
    };
    applyFilter();
  }, [doctors, speciality]);


  return (
    <div>
       <p>Browse through doctor specialty list</p>
      <div className='flex p-4'>
      <div className="flex flex-col space-y-2 p-4">
      <p onClick={()=>speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">General Physician</p>
      <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">Gynecologist</p>
      <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">Dermatologist</p>
      <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">Pediatricians</p>
      <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">Neurologist</p>
      <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist') } className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-200">Gastroenterologist</p>
</div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterDoc.map((doctor) => (
           <div
           key={doctor._id}
           onClick={() => navigate(`/Appointment/${doctor._id}`)}
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
      </div>
    </div>
    </div>
  );
};

export default Doctors;
