import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext'

const Login = () => {
  const {login} = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate()

  // To handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
    // console.log(email, password);
    // Add login functionality here
    //  navigate('/'); // for example, after successful login
  };

  return (
    <div className="font-[sans-serif] max-sm:px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-white-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 text-white-800">
                  Don't have an account ?{' '}
                  <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    Register Here
                  </Link>
                </p>
              </div>

              <div>
                <label className="text-white-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none rounded-md" // Added rounded-md
                    placeholder="user@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-white-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none rounded-md" // Added rounded-md
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div>
                  <a href="javascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">Forgot Password?</a>
                </div>
              </div>

              <div className="mt-12">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              <div className="space-x-6 flex justify-center">
                {/* GitHub Icon */}
                <button type="button" className="border-none outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 inline" fill="#ffffff" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.801 8.205 11.397.6.111.818-.26.818-.577v-2.14c-3.338.726-4.04-1.568-4.04-1.568-.546-1.387-1.333-1.758-1.333-1.758-1.089-.74.083-.726.083-.726 1.205.085 1.838 1.238 1.838 1.238 1.069 1.828 2.803 1.298 3.487.995.107-.773.418-1.298.762-1.597-2.665-.301-5.466-1.332-5.466-5.933 0-1.312.468-2.387 1.238-3.227-.124-.301-.536-.901.118-1.884 0 0 1.023-.327 3.345 1.265a11.51 11.51 0 0 1 3.053-.409c1.027 0 2.066.137 3.053.409 2.321-1.592 3.344-1.265 3.344-1.265.655.983.243 1.583.118 1.884.77.84 1.238 1.915 1.238 3.227 0 4.608-2.807 5.632-5.478 5.929.43.372.813 1.103.813 2.222v3.308c0 .318.219.69.825.577 4.767-1.596 8.205-6.094 8.205-11.397 0-6.627-5.373-12-12-12z" />
                </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
            <img src="https://readymadeui.com/signin-image.webp" className="w-full aspect-[12/12] object-contain" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
