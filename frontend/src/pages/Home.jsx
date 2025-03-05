import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">Welcome to HelpDesk!</span>
                  <br />
                  <span className="block text-indigo-600 xl:inline">Your Support Hub for All Issues.</span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  Our HelpDesk system makes it easier than ever to resolve technical issues, provide solutions and connect with our community.
                  Get immediate support with a few clicks.
                </p>
               
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="Helpdesk Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="px-2 py-16 bg-gray-50">
  <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
      Features of Our HelpDesk Application
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v12a4 4 0 004 4h6a4 4 0 004-4V3M4 3h16M12 14v4" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-all duration-300 ease-in-out">Voting System</h3>
        <p className="mt-2 text-gray-500 text-center group-hover:text-gray-700 transition-all duration-300 ease-in-out">A comprehensive voting system that enables you to find the most preferred answers to your challenges.</p>
      </div>

      <div className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v12M15 12h6m-3-3l3 3-3 3m-6 4h-5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2h-1" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-all duration-300 ease-in-out">Real-Time Support</h3>
        <p className="mt-2 text-gray-500 text-center group-hover:text-gray-700 transition-all duration-300 ease-in-out">Offer real-time support through chat and quick responses to customer inquiries.</p>
      </div>

      <div className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17l5 5m0 0l-5 5m5-5H7m8 0H7m3-10h7a2 2 0 012 2v4m-2 0h-7a2 2 0 01-2-2v-4a2 2 0 012-2h7m0-3H9a2 2 0 00-2 2v5h5V5a2 2 0 012-2h1m1 0h1a2 2 0 012 2v5h5V5a2 2 0 00-2-2h-1M12 7V4" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-all duration-300 ease-in-out">Knowledge Base</h3>
        <p className="mt-2 text-gray-500 text-center group-hover:text-gray-700 transition-all duration-300 ease-in-out">Access a comprehensive knowledge base for customers to find solutions to common issues quickly.</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
