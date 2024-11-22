import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets_frontend/assets.js';
import RealatedDoctor from '../components/RealatedDoctor.jsx';

const Appointment = () => {
  const { doctors } = useContext(AppContext);
  const [doctInfo, setDocInfo] = useState(null);
  const { docId } = useParams();
  const [slotIndex ,setSlotIndex]=useState(0);
  const [doctorslot, setDoctorSlot] = useState([]);
  const [slotTime ,  setSlotTime]=useState();
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch Doctor Info
  const fetchDocInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor || null);
  };

  // Generate Available Slots
  const setAvailableSlots = () => {
    setDoctorSlot([]);
    let today = new Date();  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      // Define end time
      let endtime = new Date(currentDate);
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);
  
      // Set starting hours/minutes

     
      if (today.getDate() === currentDate.getDate()) {
        console.log("hi");
        currentDate.setHours((currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
        currentDate.setMinutes(0);
      }

      let timeSlots=[]
  
      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDoctorSlot(prev =>([...prev,timeSlots]));
    }
   
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    setAvailableSlots();
  }, []);

  // Log slots whenever they update
  useEffect(() => {
    if (doctorslot.length > 0) {
      console.log(doctorslot);
    }
  }, [doctorslot]);

  return (
  <div className="m-12">
      {doctInfo ? (
        <div className="flex items-center justify-between p-8">
          <div className="bg-blue-500 rounded-sm border w-[450px] h-[385px] flex items-end">
            <img src={doctInfo.image} alt={doctInfo.name} />
          </div>
          <div className="rounded-sm border p-2 m-8">
            <div className="w-1/2 space-y-2 m-8">
              <h2 className="text-3xl font-semibold flex gap-2">
                {doctInfo.name}
                <img src={assets.verified_icon} alt="" />
              </h2>
              <div className="flex items-center">
                <p className="text-md font-medium">
                  {doctInfo.degree} - <span className="text-md font-medium">{doctInfo.speciality}</span>
                </p>
                <p className="text-sm border p-2 rounded-lg">{doctInfo.experience}</p>
              </div>
              <p className="text-md flex gap-2">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-md mt-2">{doctInfo.about}</p>
              <p className="text-xl font-semibold mt-4">Appointment Fee: ${doctInfo.fees}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Doctor not found.</p>
      )}

 
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slot</p>
        <div className='flex gap-3 items-center w-full  mt-4'>
           {doctorslot.length > 0 &&
           doctorslot.map((item, index) => (
           <div  key={index}
           onClick={() => setSlotIndex(index)} 
           className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
            slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200'
           }`} >
            <p>{item[0].datetime && daysofWeek[item[0].datetime.getDay()]}</p>
             <p>{item[0].datetime && item[0].datetime.getDate()}</p>
           
          </div>
       ))
       }
       </div>
        <div className="flex item-center gap-4 p-6 overflow-x-scroll">
        {doctorslot.length > 0 &&
        doctorslot[slotIndex].map((item, index) => (
        <div key={index}   onClick={() => setSlotTime(item.time)}   className='rounded-sm p-2'>
        <p className={`text-center py-4 min-w-14 rounded-full cursor-pointer ${
            item.time === slotTime ? 'bg-blue-600 text-white' : 'border border-gray-200'
           }`} >{item.time.toLowerCase()}</p>
      </div>
    ))}
   </div>
   <button className="bg-blue-600  p-4 rounded-full text-white text-xl m-8">
    Book Appointment
  </button>
      </div>
      <div className='flex items-center justify-center'>
        {doctInfo ? (
         <RealatedDoctor docId={docId} speciality={doctInfo.speciality}/>
        ):(
          <p>Loading related doctors...</p>
        )

        }
    

      </div>

    </div>
  );
};

export default Appointment;
