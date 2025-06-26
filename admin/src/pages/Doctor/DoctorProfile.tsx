import React, { useEffect, useState } from 'react';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';
interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address:Object;
  image: string;
  fees: number;
  speciality: string;
  available: boolean;
  degree:string;
  about:string;
  expirence:string;
  message:string;
  success:boolean

}

const DoctorProfile: React.FC = () => {
  const { profileData, setProfileData, getProfileData, dtoken,BackendUrl} = useDoctorContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  if (!profileData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const handleFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev!, fees: e.target.value }));
  };

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev!, available: e.target.checked }));
  };

 const handleEditToggle = () => {
  if (isEdit) {
    const updateProfile = async () => {
      try {
        const response = await axios.post<Doctor>(
          `${BackendUrl}/api/doctor/updateProfile`,
          {
            fees: profileData.fees,
            available: profileData.available,
          },
          {
            headers: {
              Authorization: `Bearer ${dtoken}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    updateProfile();
  }

  setIsEdit((prev) => !prev);
};

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-4xl ">
      <div className="bg-white rounded-lg shadow-lg p-6 md:flex md:gap-8 bg-gray-100">
        <div className="flex justify-center mb-6 md:mb-0">
          <img
            src={profileData.image}
            alt="Doctor Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {profileData.name}
            </h2>
            <p className="text-gray-600 text-sm pt-3">
              {profileData.degree} - {profileData.speciality}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">About</h3>
            <p className="text-gray-600 text-sm">{profileData.about}</p>
          </div>

          <div className="text-gray-600 text-sm pt-2 flex items-center gap-2">
            <strong>Appointment Fees:</strong>
            {isEdit ? (
              <input
                type="number"
                name="fees"
                className="border rounded px-2 py-1 w-24"
                onChange={handleFeesChange}
                value={profileData.fees || ''}
              />
            ) : (
              <span>${profileData.fees}</span>
            )}
          </div>
          <div className="flex items-start gap-2">
            <h3 className="font-medium text-gray-700">Address:</h3>
            <p className="text-gray-600 text-sm pt-1">
              {profileData.address?.line1} <br />
              {profileData.address?.line2}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={handleAvailableChange}
              disabled={!isEdit}
              className="accent-blue-500"
            />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEdit ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
