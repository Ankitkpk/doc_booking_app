import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'Sign Up' | 'Login'>('Sign Up');

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { name, email, password };
    console.log(`${state} with`, userData);
  };

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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-600 transition"
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
    </form>
  );
};

export default Login;
