import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {

  const {logout, current_user} = useContext(UserContext)

  return (
    <div>
      {/* Section 1 */}
      <section className="w-full px-8 text-white bg-gray-800">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center mb-5 font-medium text-white lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-xl font-black leading-none text-white select-none">
                HelpDesk<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-700">
              <Link to="/" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                Home
              </Link>
              <Link to="/profile" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                Profile
              </Link>
              <Link to="/problems" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                Problems
              </Link>
              <Link to="/faqs" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                FAQs
              </Link>
              <Link to="/about" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                About
              </Link>
              <Link to="/notifications" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                Notifications
              </Link>
              <Link to="/categories" className="mr-5 font-medium leading-6 text-gray-400 hover:text-white">
                Categories
              </Link>

            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="text-base font-medium leading-6 text-gray-400 whitespace-no-wrap transition duration-150 ease-in-out hover:text-white"
            >
              Login
            </Link>
            
            <Link
            onClick={() => logout()}
            className="text-base font-medium leading-6 text-gray-400 whitespace-no-wrap transition duration-150 ease-in-out hover:text-white"
            >
            Logout
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
