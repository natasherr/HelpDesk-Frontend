import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { logout, current_user } = useContext(UserContext);

  return (
    <div>
      {/* Navbar Section */}
      <section className="w-full px-8 text-white bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center mb-5 font-medium text-white lg:w-auto lg:items-center lg:justify-center md:mb-0 hover:scale-105 transition-transform duration-200"
          >
            <span className="mx-auto text-2xl font-black leading-none text-white select-none">
              HelpDesk<span className="text-indigo-500">.</span>
            </span>
          </Link>

          {/* Navigation Links */}
          {current_user ? (
            <>
              <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-700">
                <Link
                  to="/"
                  className="mr-6 font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/problems"
                  className="mr-6 font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Problems
                </Link>
                <Link
                  to="/categories"
                  className="mr-6 font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Categories
                </Link>
                <Link
                  to="/addproblem"
                  className="mr-6 font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Add Problem
                </Link>
              </nav>

              {/* Profile and Logout Section */}
              <div className="ml-auto inline-flex items-center space-x-4">
                <Link
                  to="/notifications"
                  className="font-medium leading-6 text-gray-300 hover:text-white transition-all duration-200"
                >
                  Notification
                </Link>
                <Link
                  to="/profile"
                  className="font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=rupFD7sZ58qx&format=png&color=FA5252"
                    alt="Logout"
                    className="w-6 h-6 hover:invert hover:brightness-200 transition-all duration-200"
                  />
                </button>
              </div>
            </>
          ) : (
            <div className="ml-auto inline-flex items-center space-x-6 lg:justify-end">
              <Link
                to="/about"
                className="font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
              >
                About
              </Link>
              <Link
                to="/faqs"
                className="font-medium leading-6 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
              >
                FAQs
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="text-base font-medium leading-6 text-gray-300 whitespace-no-wrap hover:text-white hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navbar;