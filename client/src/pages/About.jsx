import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12 mx-auto">
      <div className="text-center">
        <p className="text-2xl font-light">ABOUT <span className="font-semibold">US</span></p>
      </div>
      <div className="my-12 flex justify-center flex-col gap-12 md:flex-row"> 
        <img src={assets.about_image} className="w-full md:max-w-[360px]" alt="about image" />
        <div className="flex flex-col justify-between">
          <p className="text-2xl font-light">Welcome to Prescripto, your trusted partner in managing your healthcare needs
            conveniently and efficiently. At Prescripto, we understand the challenges individuals
            face when it comes to scheduling doctor appointments and managing their health records.</p>
          
          <p className="text-2xl font-light">Prescripto is committed to excellence in healthcare technology. We continuously strive
            to enhance our platform, integrating the latest advancements to improve user experience
            and deliver superior service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the way.</p>
          
          <b className="text-2xl font-light">Our vision</b>
          <p className="text-2xl font-light">Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers, making it easier for
            you to access the care you need, when you need it.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
