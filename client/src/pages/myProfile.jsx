import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const [userDate, setUserDate] = useState({
    name: "Edward Vincent",
    phone: "+1 123 456 7890",
    email: "richardjameswap@gmail.com",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "male",
    birthday: "20 July, 2024",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex items-center justify-center'>
<div className="ml-5 p-6 space-y-8 rounded-lg shadow-md max-w-lg">
      <div className="flex items-center space-x-4">
        <img
          src={assets.profile_pic}
          alt="profile"
          className="w-24 h-24 rounded-full border-2 border-blue-400"
        />
        <div>
          {isEdit ? (
            <input
              type="text"
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              value={userDate.name}
              onChange={(e) =>
                setUserDate((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h1 className="text-xl font-bold text-gray-700">{userDate.name}</h1>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Contact Information */}
      <section>
        <h1 className="text-lg font-semibold text-gray-600 mb-4">
          CONTACT INFORMATION
        </h1>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-600 w-24">Email:</label>
            {isEdit ? (
              <input
                type="email"
                className="block flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                value={userDate.email}
                onChange={(e) =>
                  setUserDate((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <h1 className="text-md font-bold text-blue-500">
                {userDate.email}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-600 w-24">Phone:</label>
            {isEdit ? (
              <input
                type="text"
                className="block flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                value={userDate.phone}
                onChange={(e) =>
                  setUserDate((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <h1 className="text-md font-bold text-blue-500">
                {userDate.phone}
              </h1>
            )}
          </div>
          <div className="flex items-start gap-3">
            <label className="font-medium text-gray-600 w-24">Address:</label>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={userDate.address.line1}
                  onChange={(e) =>
                    setUserDate((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  placeholder="Line 1"
                />
                <input
                  type="text"
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                  value={userDate.address.line2}
                  onChange={(e) =>
                    setUserDate((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  placeholder="Line 2"
                />
              </div>
            ) : (
              <div>
                <p className="text-gray-700">{userDate.address.line1}</p>
                <p className="text-gray-700">{userDate.address.line2}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="border-gray-300" />

      {/* Basic Information */}
      <section>
        <h1 className="text-lg font-semibold text-gray-600 mb-4">
          BASIC INFORMATION
        </h1>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-600 w-24">Gender:</label>
            {isEdit ? (
              <input
                type="text"
                className="block flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                value={userDate.gender}
                onChange={(e) =>
                  setUserDate((prev) => ({ ...prev, gender: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-700">{userDate.gender}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-600 w-24">Birthday:</label>
            {isEdit ? (
              <input
                type="date"
                className="block flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                value={userDate.birthday}
                onChange={(e) =>
                  setUserDate((prev) => ({ ...prev, birthday: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-700">{userDate.birthday}</p>
            )}
          </div>
        </div>
      </section>

      <hr className="border-gray-300" />

      {/* Edit and Save Button */}
      <div className="text-center">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
</div>

    
  );
};

export default MyProfile;



/*The ... (spread operator) is used in the onChange event to update only a specific property of the userDate object while keeping the rest of the object unchanged. Here's why it's necessary:     */