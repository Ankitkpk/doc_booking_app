import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppcontext';
import axios from 'axios';
import { assets } from '../assets/assets_frontend/assets';


interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: {
    name: string;
    phone: string;
    gender: string;
    dob: string;
    image: string;
    address: {
      line1: string;
      line2: string;
    };
    
  };
}





const Profile: React.FC = () => {
  const { userData, setUserData, BackendUrl, token } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (field: string, value: string) => {
    setUserData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line: 'line1' | 'line2', value: string) => {
    setUserData((prev: any) => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('address[line1]', userData.address.line1);
      formData.append('address[line2]', userData.address.line2);
      if (image) {
        formData.append('image', image);
      }

      const res = await axios.post<UpdateProfileResponse>(
        `${BackendUrl}/api/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) {
        setUserData(res.data.user);
        setIsEdit(false);
        setImage(null);
        console.log('Saved Data:', res.data.user);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="flex flex-col mt-8 p-4">
      <div>
        {isEdit ? (
          <label className="cursor-pointer">
            <div className="relative w-32 h-40">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Preview"
                className="w-full h-full rounded-md object-cover border border-gray-300"
              />
              <img
                src={image ? '' : assets.upload_icon}
                alt=""
              
              />
            </div>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImage(file);
              }}
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-40 rounded-md object-cover border border-gray-300"
          />
        )}
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
              <p className="text-sm text-blue-600">{userData.email}</p>
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

            <div className="flex gap-4">
              <p className="text-sm text-gray-600 w-20">Address:</p>
              <div className="text-sm text-gray-600 w-full">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={userData.address?.line1 || ''}
                      onChange={(e) =>
                        handleAddressChange('line1', e.target.value)
                      }
                      className="border border-gray-300 p-1 mb-2 rounded w-full"
                    />
                    <input
                      type="text"
                      value={userData.address?.line2 || ''}
                      onChange={(e) =>
                        handleAddressChange('line2', e.target.value)
                      }
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    {userData.address?.line1}
                    <br />
                    {userData.address?.line2}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-2 text-gray-700 underline">
            BASIC INFORMATION
          </p>

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

          <div className="flex gap-4 py-2">
            <p className="text-sm text-gray-600 w-20">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob || ''}
                onChange={(e) => handleChange('dob', e.target.value)}
                className="border border-gray-300 p-1 rounded text-sm w-full"
              />
            ) : (
              <p className="text-sm text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
            onClick={() => {
              setIsEdit(!isEdit);
              if (!isEdit) setImage(null); // clear image on cancel
            }}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>

          <button
            className="px-4 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
            onClick={handleSave}
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
