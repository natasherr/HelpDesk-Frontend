import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";
import ForgotPassword from '../pages/ForgotPassword';


const Login = () => {
  const { login, current_user, login_with_google } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if the user is already logged in
  useEffect(() => {
    if (current_user) {
      navigate('/');
    }
  }, [current_user, navigate]);


  function handleGoogleLogin(credential){
    try{
      const user_details = jwtDecode(credential)
      login_with_google(user_details.email)
      toast.success("Login success!")
      navigate("/")
    }
    catch(error){
      toast.error("Google sign in failed")
    }
  }

  return (
    <div className="font-[sans-serif] max-sm:px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-md rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">

                <h3 className="text-white-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 text-white-800">
                  Don't have an account?{' '}

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
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none rounded-md"
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
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none rounded-md"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">

                
                <div>
                  <Link to="/forgot-password" href="javascript:void(0);" className="text-white-600 font-semibold text-sm hover:underline">Forgot Password?</Link>
                </div>
              </div>

              <div className="mt-12">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />

                <p className="text-sm text-white-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              <GoogleLogin
                onSuccess={credentialResponse => {
                  handleGoogleLogin(credentialResponse.credential)
                  
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
                useOneTap
              />

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