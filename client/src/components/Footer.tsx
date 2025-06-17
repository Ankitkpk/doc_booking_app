import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer: React.FC = () => {
  return (
    <div className="mt-10 p-2 mt-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
          <div>
            <img src={assets.logo} alt="Logo" className="h-12 mb-4" />
            <p className="text-black w-full md:w-1/2 lg:w-[370px] text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis nisi accusantium officia commodi porro explicabo unde vero, ratione dicta voluptate temporibus doloribus cumque, nihil repellendus voluptatum ut? Cum, quam delectus.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4 text-black">COMPANY</h2>
            <ul className="space-y-3 text-sm text-black">
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">About us</li>
              <li className="hover:underline cursor-pointer">Contact us</li>
              <li className="hover:underline cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-black">GET IN TOUCH</h2>
            <p className="text-sm text-black mb-1">+1-212-456-7890</p>
            <p className="text-sm text-black">greatstackdev@gmail.com</p>
          </div>
        </div>
      <div className="text-center mt-10 text-black text-xs border-t border-black/30 pt-6">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
