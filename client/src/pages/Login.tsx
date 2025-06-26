import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppcontext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

interface userLoginresponse {
  success: boolean;
  token: string;
  message: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, BackendUrl } = useAppContext();
  const [state, setState] = useState<'Sign Up' | 'Login'>('Sign Up');

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const response = await axios.post<userLoginresponse>(`${BackendUrl}/api/user/registerUser`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully!");
        }
      } else {
        const response = await axios.post<userLoginresponse>(`${BackendUrl}/api/user/LoginUser`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('atoken', response.data.token);
          toast.success("Login successful!");
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
      console.error("Auth error:", msg);
    }
  };

 useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  }, [token]);
  
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex flex-col justify-center items-center p-6 gap-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-2xl p-6 space-y-4">
        <h1 className="text-md font-semibold text-center">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
          <p>{state === 'Sign Up' ? 'Sign up' : 'Login'} to book an appointment</p>
        </h1>

        {state === 'Sign Up' && (
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {state}
        </button>

        <p className="text-center text-sm">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </form>
  );
};

export default Login;
