import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate} from 'react-router-dom';

const RelatedDoctor = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  // Fetch doctors based on speciality
  const fetchRelatedDoctors = () => {
    const filteredDoctors = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
    setRelatedDoctors(filteredDoctors);
  };

  useEffect(() => {
    fetchRelatedDoctors();
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-3xl p-4">Related Doctors</p>
      <p className="text-md">Simply browse through our extensive list of trusted doctors:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {relatedDoctors.length > 0 ? (
          relatedDoctors.slice(0,5).map((doctor,index) => (
            <div
              key={index}
              onClick={() => navigate(`/Appointment/${doctor._id}`)}
              className="border rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={doctor.image || 'default_image_url'}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{doctor.name}</h3>
              <p className="text-sm">{doctor.degree}</p>
              <p className="text-sm">{doctor.speciality}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No related doctors found for this speciality.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctor;
