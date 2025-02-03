import axios from "axios";
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/adminContext';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const [state, setState] = useState('Admin');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {setAToken,BackendUrl}=useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    //CALL API IN BACKEND//
       try{
         if(state == 'Admin'){
          const { data } = await axios.post(BackendUrl +'/api/admin/admin-login',{email,password});
          if(data.success){
            //when browser is reloaded data should not get vanished//
            localStorage.setItem('Atoken',data.token);
            setAToken(data.token);
          }else{
            toast.error(data.message);
          }
         }else{
            //call the doctor login api//
         }
       }catch{
    
       }
  }

  return (
    <form  onSubmit={onSubmitHandler}className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-4 sm:px-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-xl">
        <p className="text-2xl sm:text-3xl font-semibold text-center">
          {state} <span className="text-blue-500">Login</span>
        </p>

        <div className="mt-6 w-full flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mt-4 w-full flex flex-col">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="mt-6 py-3 w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <p className="text-md sm:text-lg font-semibold text-gray-400 flex justify-center items-center gap-2 mt-4">
          {state === 'Admin' ? 'Doctor Login?' : 'Admin Login?'}
          <span
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-violet-600 cursor-pointer hover:underline"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;

