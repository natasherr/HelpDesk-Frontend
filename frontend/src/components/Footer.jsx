import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
            <svg className="w-8 text-deep-purple-accent-400" viewBox="0 0 24 24" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" stroke="currentColor" fill="none">
              <rect x="3" y="1" width="7" height="12"></rect>
              <rect x="3" y="17" width="7" height="6"></rect>
              <rect x="14" y="1" width="7" height="6"></rect>
              <rect x="14" y="11" width="7" height="12"></rect>
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-white-800 uppercase">HelpDesk</span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-white-800">
              Our mission is to provide you with the most efficient solutions to your technical issues. We are here to help!
            </p>
          </div>
        </div>
        
        {/* Contact Support Section */}
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-white-900">Contact Support</p>
          <div className="flex">
            <p className="mr-1 text-white-800">Phone:</p>
            <a href="tel:850-123-5021" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">+254 701 234 567</a>
          </div>
          <div className="flex">
            <p className="mr-1 text-white-800">Email:</p>
            <a href="mailto:support@helpdesk.com" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">support@helpdesk.com</a>
          </div>
        </div>
        
        {/* Helpdesk Links */}
        <div>
          <span className="text-base font-bold tracking-wide text-white-900">Helpful Links</span>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/about" className="text-white-500 hover:text-deep-purple-accent-400">About Us</Link>
            </li>
            <li>
              <Link to="/knowledge-base" className="text-white-500 hover:text-deep-purple-accent-400">Notification</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">
          © 2025 Helpdesk. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
