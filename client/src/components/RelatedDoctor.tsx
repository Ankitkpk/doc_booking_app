import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


interface RelatedDoctorProps {
  docId: string;
  speciality: string;
}

const RelatedDoctor: React.FC<RelatedDoctorProps> = ({ docId, speciality }) => {
  const {doctors} = useContext(AppContext)!;
  const [relDocs, setRelDocs] = useState<typeof doctors>([]);
  const navigate=useNavigate();
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filteredDocs = doctors.filter(
        (doc:any) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(filteredDocs);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-3xl font-semibold mb-4">Related Doctors</h2>
      <p className="mb-6 text-center">Simply browse through our extensive list of trusted doctors.</p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {relDocs.map((doctor) => (
          <div
          key={doctor._id}
          className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 w-full max-w-sm mx-auto"
          onClick={() => navigate(`/appointment/${doctor._id}`)}
        >
          <div className=" bg-blue-50 w-full flex justify-center items-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-35 h-40 object-cover rounded-md"
            />
          </div>
        
          <div className="flex items-center text-green-500 text-sm font-medium pt-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Available
          </div>
        
          <div className="px-4 py-2 text-center">
            <p className="text-base font-semibold text-gray-800">{doctor.name}</p>
            <p className="text-xs text-gray-600 mt-1">{doctor.speciality}</p>
          </div>
        </div>
        ))}
        {relDocs.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No related doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctor;
