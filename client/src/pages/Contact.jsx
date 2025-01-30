import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets_frontend/assets.js';
const Contact = () => {
  return (
    <div>
      <div className='text-center p-10 m-4'>
       <p className="text-3xl">
     <span className="inline text-gray-400">CONTACT</span>
     <span className="inline text-gray-700">US</span>
     </p>
      </div>
      <div className='flex items-center justify-center gap-10 mt-4'>
      <img src={assets.contact_image} alt="contact" className='w-full md:w-[430px]' />
      <div className='flex flex-col gap-y-6'>
       <p className='text-xl font-bold dark:text-gray-100 dark:font-serif'>OUR OFFICE</p>
       <p> Willms Station <br/>Suite 350 Washington,USA</p>
       <p>Tel:(415)555-0132<br/>Email:ankitkarapurkar@gmail.com</p>
       <p className='text-xl font-bold dark:text-gray-100 dark:font-serif'>CAREERS AT PRESCRIPTO</p>
       <p>Learn more about our teams and job openngs</p>
       <p className="border border-gray-400 p-3 w-[140px] text-center hover:bg-black hover:text-white transition-colors duration-300">
       Explore jobs
      </p>
      </div>
      </div>

    </div>
  )
}

export default Contact