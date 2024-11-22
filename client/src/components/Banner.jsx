import { assets } from '../assets/assets_frontend/assets';
import { GoArrowRight } from "react-icons/go";

const Banner = () => {
  return (
    <div className='flex items-center justify-between bg-blue-500 h-1/2 mx-8 rounded-[15px] p-6'>
      <div className='flex flex-col items-start justify-center space-y-4 pl-6 w-full'>
        <p className="font-bold text-4xl sm:text-5xl text-white leading-tight">
          Book Appointment
        </p>
        <p className="font-bold text-4xl sm:text-5xl text-white leading-tight">
          with 100+ Trusted Doctors
        </p>
        <button 
          href="#speciality" 
          className="bg-white border border-white text-black font-semibold py-3 px-6 rounded-full flex items-center hover:bg-gray-100 hover:border-gray-200"
        >
          <span>Create Appointment</span>
          <GoArrowRight className="ml-2" />
        </button>
      </div>
      <div className='flex items-center'>
        <img src={assets.appointment_img} className='p-4 h-3/4 max-w-full object-cover rounded-lg' alt="Appointment" />
      </div>
    </div>
  );
};

export default Banner;
