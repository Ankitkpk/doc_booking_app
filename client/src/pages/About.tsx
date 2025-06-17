import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About: React.FC = () => {
  return (
    <div className="flex flex-col px-4 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">About Us</h1>

      <div className="flex flex-col md:flex-row items-center justify-around gap-10">
        <img
          src={assets.about_image}
          alt="About Prescripto"
          className="w-full md:max-w-[360px]"
        />

        <div className="flex flex-col gap-8 mt-4 text-gray-700 text-sm md:text-base">
          <p>
            Welcome to <strong>Prescripto</strong>, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we understand the
            challenges individuals face when it comes to scheduling doctor appointments and
            managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive
            to enhance our platform, integrating the latest advancements to improve user experience
            and deliver superior service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <h2 className="text-xl font-semibold mt-4 text-black">Our Vision</h2>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers, making it easier
            for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className='mt-15'>
      <p className="text-xl mt-6 text-gray-800">
       WHY <span className="text-black font-extrabold">CHOOSE US</span>
      </p>
     </div>
    <div className="flex flex-col justify-around md:flex-row mb-10 py-8 ">
    <div className="border-gray-600 border flex-1 py-8 px-10">
    <h2 className="font-semibold text-lg mb-6">Efficiency</h2>
    <p className="text-gray-700 mb-4">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
    </div>
   <div className="border-gray-600 border flex-1 py-8 px-10">
    <h2 className="font-semibold text-lg  mb-6">Convenience</h2>
    <p className="text-gray-700  mb-4">Access to a network of trusted healthcare professionals in your area.</p>
   </div>
   <div className="border-gray-600 border  flex-1 py-8 px-10">
    <h2 className="font-semibold text-lg mb-6">Personalization</h2>
    <p className="text-gray-700 mb-4">Tailored recommendations and reminders to help you stay on top of your health.</p>
   </div>
   </div>
    </div>
  );
};

export default About;
