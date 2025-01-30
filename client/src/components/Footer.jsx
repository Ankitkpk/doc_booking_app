
import React from 'react';
import { assets } from '../assets/assets_frontend/assets';


const Footer = () => {
  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='flex w-full justify-evenly items-start mb-10'>
        <div className='flex flex-col items-start w-1/3 p-4 space-y-4'>
          <img
            src={assets.logo}
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
          <p className='text-sm'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        
        <div className='flex flex-col space-y-1 items-center p-4 w-1/3'>
          <h1 className='text-xl font-bold'>COMPANY</h1>
          <ul className='space-y-1'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        
        <div className='flex flex-col space-y-1 items-start p-4 w-1/3'>
          <h1 className='text-xl font-bold'>Get in Touch</h1>
          <ul className='space-y-1'>
            <li>+1-212-456-7890</li>
            <li>ankitkarapurkar@gmail.com</li>
          </ul>
        </div>
      </div>
      
      <hr className='w-full border-gray-300 mb-4' />
      
      <div className='text-center text-sm text-gray-600 mb-4'>
        © 2024 - All rights reserved
      </div>
    </div>
  );
}

export default Footer;
