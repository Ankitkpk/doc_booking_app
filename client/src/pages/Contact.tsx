import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact: React.FC = () => {
  return (
    <div className="px-4 py-8 md:px-16 text-gray-800">
      <p className="text-2xl font-semibold text-center mb-8">
        CONTACT <span className="text-black font-bold">US</span>
      </p>
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mt-20">
        <img
          src={assets.contact_image}
          alt="Contact"
          className="w-full md:max-w-[460px]"
        />
        <div className="space-y-10 md:w-1/2 mt-15">
          <div>
            <h2 className="text-xl font-bold mb-2">OUR OFFICE</h2>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p><strong>Tel:</strong> (415) 555‑0132</p>
            <p><strong>Email:</strong> greatstackdev@gmail.com</p>
          </div>
          <div>
            <h2 className="text-xl text-black font-bold mb-2">CAREERS AT <span>PRESCRIPTO</span></h2>
            <p className="mb-4">Learn more about our teams and job openings.</p>
            <button className="border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white transition-all duration-500">
             Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
