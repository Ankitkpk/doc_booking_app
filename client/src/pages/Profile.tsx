import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    email: 'richardjameswap@gmail.com',
    image: assets.profile_pic,
    phone: '+1 123 456 7890',
    Address: {
      line1: '57th Cross, Richmond Circle,',
      line2: 'Church Road, London',
    },
    gender: 'Male',
    dob: '20 July, 2024',
  });

  const [isEdit, setIsEdit] = useState(true);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line: 'line1' | 'line2', value: string) => {
    setUserData((prev) => ({
      ...prev,
      Address: {
        ...prev.Address,
        [line]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col mt-8 p-4">
      <div>
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-40 rounded-md object-cover border border-gray-300"
        />
      </div>
      <div className="mt-6 text-3xl font-bold text-black">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        ) : (
          <h1>{userData.name}</h1>
        )}
      </div>

      <div className="space-y-6 mt-6">
       
        <div>
          <p className="text-lg font-semibold mb-2 text-gray-500 underline">
            CONTACT INFORMATION
          </p>
          <div className="flex flex-col gap-2">
        
            <div className="flex gap-4">
              <p className="text-sm text-gray-600 w-20">Email ID:</p>
              {isEdit ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="border border-gray-300 p-1 rounded text-sm w-full"
                />
              ) : (
                <p className="text-sm text-blue-600">{userData.email}</p>
              )}
            </div>

          
            <div className="flex gap-4">
              <p className="text-sm text-gray-600 w-20">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border border-gray-300 p-1 rounded text-sm w-full"
                />
              ) : (
                <p className="text-sm text-blue-600">{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <p className="text-sm text-gray-600 w-20">Address:</p>
              <div className="text-sm text-gray-600 w-full">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={userData.Address.line1}
                      onChange={(e) => handleAddressChange('line1', e.target.value)}
                      className="border border-gray-300 p-1 mb-2 rounded w-full"
                    />
                    <input
                      type="text"
                      value={userData.Address.line2}
                      onChange={(e) => handleAddressChange('line2', e.target.value)}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    {userData.Address.line1}
                    <br />
                    {userData.Address.line2}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <p className="text-lg font-semibold mb-2 text-gray-700 underline">
            BASIC INFORMATION
          </p>

          {/* Gender */}
          <div className="flex gap-4">
            <p className="text-sm text-gray-600 w-20">Gender:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="border border-gray-300 p-1 rounded text-sm w-full"
              />
            ) : (
              <p className="text-sm text-gray-600">{userData.gender}</p>
            )}
          </div>

          {/* Birthday */}
          <div className="flex gap-4 py-2">
            <p className="text-sm text-gray-600 w-20">Birthday:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                className="border border-gray-300 p-1 rounded text-sm w-full"
              />
            ) : (
              <p className="text-sm text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 justify-center">
          <button
            className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>

          <button
            className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
            onClick={() => {
              setIsEdit(false);
              console.log('Saved Data:', userData);
        
            }}
            disabled={!isEdit}
          >
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
