import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAdminContext } from '../hooks/useAdminContext';


interface AdminLoginResponse
{
token:string,
success:Boolean,
message:string
}


const Login = () => {
  const [state, setState] = useState('Admin');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {setToken,BackendUrl}=useAdminContext();

 
  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const response = await axios.post<AdminLoginResponse>(
      `${BackendUrl}/api/admin/adminLogin`,
      { email, password }
    );

    if (response.data.success) {
      setToken(response.data.token);
      console.log(response.data.message);
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong while logging in.');
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-8  min-w-[335px] rounded-lg shadow-lg border border-gray-300 bg-white">
        <div className="text-xl font-semibold text-black">
       <span className="text-blue-600">{state}</span> Login
       </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
             
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
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
  {state === 'Admin' ? (
    <p>
      Doctor Login?{' '}
      <span onClick={() => setState('Doctor')} className="text-blue-600 cursor-pointer font-medium">
        Click here
      </span>
    </p>
  ) : (
    <p>
      Admin Login?{' '}
      <span onClick={() => setState('Admin')} className="text-blue-600 cursor-pointer font-medium">
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
