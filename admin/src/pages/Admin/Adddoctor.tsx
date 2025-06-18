import React, { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { useAdminContext } from '../../hooks/useAdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

interface DoctorRegisterResponse {
  success: boolean;
  message: string;
  doctor: any;
}



const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

const AddDoctor: React.FC = () => {
  const [docImg, setDocImg] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [education, setEducation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');

  const {BackendUrl,setToken}=useAdminContext();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!docImg) {
    toast.error("Please upload doctor image");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', fees.toString());
    formData.append('education', education);
    formData.append('speciality', speciality);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
    formData.append('about', about);

    const response = await axios.post<DoctorRegisterResponse>(
      `${BackendUrl}/api/doctor/doctorRegister`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message || "Doctor registered successfully");
      setName('');
      setEmail('');
      setPassword('');
      setDocImg(null);
      setExperience('');
      setFees('');
      setSpeciality('');
      setEducation('');
      setAddress1('');
      setAddress2('');
      setAbout('');
    } else {
      toast.error(response.data.message || "Failed to register doctor");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Something went wrong");
    console.error("Register doctor error:", error);
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocImg(file);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto flex items-start justify-center bg-gray-100 py-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-4 sm:mx-6 space-y-8 bg-white p-6 rounded-lg shadow"
      >
        <div className="flex flex-col items-center sm:items-start gap-2">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={
                docImg ? URL.createObjectURL(docImg) : assets.upload_area
              }
              alt="Upload"
              className="w-28 h-28 object-cover rounded-full shadow"
            />
          </label>
          <input id="doc-img" type="file" className="hidden" onChange={handleFileChange} />
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Upload Image for Doctor
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="mb-1 font-medium">Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 font-medium">Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 font-medium">Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 font-medium">Experience</p>
              <select
                id="experience"
                className={inputClass}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select experience</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3+ Years</option>
              </select>
            </div>
            <div>
              <p className="mb-1 font-medium">Fees</p>
              <input
                type="number"
                placeholder="Fees"
                className={inputClass}
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-1 font-medium">Speciality</p>
              <select
                id="speciality"
                className={inputClass}
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="">Select Speciality</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="general">General Physician</option>
              </select>
            </div>
            <div>
              <p className="mb-1 font-medium">Education</p>
              <input
                type="text"
                placeholder="Education/Degree"
                className={inputClass}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 font-medium">Address</p>
              <input
                type="text"
                placeholder="Address Line 1"
                className={inputClass}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className={`${inputClass} mt-2`}
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mb-1 font-medium">About</p>
          <textarea
            placeholder="Write something about the doctor..."
            className={`${inputClass} h-28 resize-none`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
