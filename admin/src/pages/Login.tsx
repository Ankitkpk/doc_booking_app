import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAdminContext } from '../hooks/useAdminContext';

interface AdminLoginResponse {
  token: string;
  success: boolean;
  message: string;
}

interface DoctorLoginResponse {
  dtoken: string;
  success: boolean;
  message: string;
}

const Login: React.FC = () => {
  const [role, setRole] = useState<'Admin' | 'Doctor'>('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, BackendUrl } = useAdminContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (role === 'Admin') {
        const response = await axios.post<AdminLoginResponse>(
          `${BackendUrl}/api/admin/adminLogin`,
          { email, password }
        );

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          toast.success('Admin login successful');
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        const response = await axios.post<DoctorLoginResponse>(
          `${BackendUrl}/api/doctor/doctorLogin`,
          { email, password }
        );

        if (response.data.success) {
          localStorage.setItem('dtoken', response.data.dtoken);
          setToken(response.data.dtoken);
          toast.success('Doctor login successful');
        } else {
          toast.error('Invalid credentials');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-8 min-w-[335px] rounded-lg shadow-lg border border-gray-300 bg-white">
        <div className="text-xl font-semibold text-black">
          <span className="text-blue-600">{role}</span> Login
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all mb-6"
        >
          Login
        </button>

        <div className="text-center text-sm">
          {role === 'Admin' ? (
            <p>
              Doctor Login?{' '}
              <span
                onClick={() => setRole('Doctor')}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{' '}
              <span
                onClick={() => setRole('Admin')}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
