import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



const Register = () => {

  const {addUser} = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [profilePicture, setProfilePicture] = useState(null);
  // const navigate = useNavigate();

  // To handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    }

    addUser(username, email, password)
    console.log({ username, email});
  };


  function signUpWithGoogle(token){  
    console.log("Sign up token:",token)

    const decoded = jwtDecode(token)
    addUser(decoded.given_name, decoded.email, password, decoded.picture)
    
    console.log(decoded)
  }

  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-gray-800 text-white">
  <div className="mt-12 flex flex-col items-center">
    <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
    <div className="w-full flex-1 mt-8">
      <div className="mx-auto max-w-xs">
        {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
            type="text"
            placeholder="Use a unique name!"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600 mt-5"
            type="email"
            placeholder="user@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600 mt-5"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600 mt-5"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className="mt-5 tracking-wide font-semibold bg-indigo-600 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            type="submit"
          >
            <svg
              className="w-6 h-6 -ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">Sign Up</span>
          </button>
        </form>

        {/* GitHub Sign Up Button */}
        {/* <button
          className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
          onClick={handleGitHubLogin}
        >
          <div className="bg-white p-1 rounded-full">
            <svg className="w-6" viewBox="0 0 32 32">
              <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
            </svg>
          </div>
          <span className="ml-4">Sign Up with GitHub</span>
        </button> */}
        <br />

        <div>
          <GoogleLogin
            onSuccess={credentialResponse => {
              signUpWithGoogle(credentialResponse.credential)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
            useOneTap
          />
        </div>
      </div>
    </div>
  </div>
</div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Register;