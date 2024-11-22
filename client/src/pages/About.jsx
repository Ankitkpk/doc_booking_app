import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const About = () => {
  return (
    <div>
      <p className="flex items-center justify-center text-3xl m-12">
        ABOUT<span className="text-3xl font-bold">US</span>
      </p>
      <div className="flex items-center justify-evenly  mt-8 p-2 ">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img src={assets.about_image} alt="about us" className='w-full h-2/3' />
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col justify-evenly w-1/2 gap-y-14">
          <p className="text-xl break-words leading-7 mb-4 tracking-wide" style={{ wordSpacing: "0.5em" }}>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs
            conveniently and efficiently. At Prescripto, we understand the challenges individuals
            face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-xl break-words leading-7 mb-4 tracking-wide" style={{ wordSpacing: "0.5em" }}>
            Prescripto is committed to excellence in healthcare technology. We continuously strive
            to enhance our platform, integrating the latest advancements to improve user experience
            and deliver superior service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-xl mb-4">Our vision</b>
          <p className="text-xl break-words leading-7 mb-4 tracking-wide" style={{ wordSpacing: "0.5em" }}>
            Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers, making it easier for
            you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className='text-xl mt-4'>
        <p>WHY <span>CHOOSE US</span></p>
      </div>
    </div>
  );
};

export default About;
