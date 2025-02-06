import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, BackendUrl } = useContext(AppContext);
  const [state, setState] = useState('sign-up');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'sign-up') {
        const { data } = await axios.post(BackendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(BackendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[40vh] w-[90%] mt-12 mb-12 max-w-md mx-auto flex flex-col p-8 space-y-6 items-center border border-gray-300 shadow-lg rounded-lg bg-white"
    >
      <p className="text-2xl font-bold text-gray-700 mb-4">
        {state === 'sign-up' ? 'Create Account' : 'Login'}
      </p>
      <p>please {state === 'sign-up' ? 'sign up' : 'Login '} to book an appointment</p>
      {state === 'sign-up' && (
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
      )}
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-2 mt-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300"
      >
        {state === 'sign-up' ? 'Sign Up' : 'Login'}
      </button>
      {state === 'sign-up' ? (
        <p>
          Already have an account?{' '}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => setState('login')}
          >
            Login
          </span>
        </p>
      ) : (
        <p>
          Don't have an account?{' '}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => setState('sign-up')}
          >
            Create New
          </span>
        </p>
      )}
    </form>
  );
};

export default Login;
