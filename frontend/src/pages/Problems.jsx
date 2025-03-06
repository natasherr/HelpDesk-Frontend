import React, { useState, useContext } from "react";
import { FaThumbsUp, FaThumbsDown, FaUser, FaSearch, FaFilter, FaLock } from "react-icons/fa";
import { HelpDeskContext } from "../context/HelpDeskContext";
import { Link, useNavigate } from "react-router-dom";

const Problems = () => {
  const { problem } = useContext(HelpDeskContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleLogin = () => {
    try {
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      setError(true); // Set error state if navigation fails
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="px-2 py-10">
        <div id="features" className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Problems
          </h2>
          {problem.length > 0 ? (
            <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center text-white">
              {problem.map((problems) => (
                <li
                  key={problems.id}
                  className="rounded-xl bg-gray-800 px-6 py-8 shadow-sm border border-gray-700 flex flex-col"
                >
                  <img
                    src="https://www.svgrepo.com/show/530438/ddos-protection.svg"
                    alt=""
                    className="mx-auto h-10 w-10"
                  />
                  <Link to={`/singleproblem/${problems.id}`}>
                    <h3 className="my-3 font-display font-medium text-lg border-b pb-2 border-gray-600 text-white">
                      Problem:
                    </h3>
                  </Link>
                  <p className="mb-4 text-gray-300 font-medium font-display flex-grow">
                    {problems.description}
                  </p>

                  {/* Display problem tags */}
                  {problems.tag && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {problems.tag.name}
                      </span>
                    </div>
                  )}

                  {/* Display solutions */}
                  <h4 className="mt-4 font-semibold text-md border-t pt-2 border-gray-600 text-white">
                    Solutions:
                  </h4>
                  {problems.solutions.length > 0 ? (
                    <ul className="mt-1.5 text-sm leading-6 text-gray-300">
                      {problems.solutions.map((sol) => (
                        <li
                          key={sol.id}
                          className="border-t border-gray-600 pt-2 mt-2"
                        >
                          {sol.description}
                          {sol.tag && (
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full ml-2">
                              {sol.tag.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1.5 text-sm leading-6 text-gray-300">
                      No solutions yet
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <FaLock className="text-gray-300 text-4xl" aria-hidden="true" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Login Required
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Please log in to access any of the problems.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Go to login page"
                  >
                    Go to Login
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    Navigation failed. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;