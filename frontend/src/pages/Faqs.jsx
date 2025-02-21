import React from 'react';

const faqs = () => {
  return (
    <div className="relative isolate overflow-hidden bg-custom">
      <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">F.A.Q</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
        </div>
        <ul className="basis-1/2">
          {/* Question 1 */}
          <li className="group">
            <button className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
              <span className="flex-1 text-base-content">How can I contact the helpdesk?</span>
              <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out false"></rect>
                <rect y="7" width="16" height="2" rx="1" className="block group-hover:opacity-0 origin-center rotate-90 transition duration-200 ease-out false"></rect>
              </svg>
            </button>
            <div className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden">
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">
                  You can contact our helpdesk by emailing support@company.com or by calling our toll-free number 1-800-HELP. Additionally, you can visit our live chat on the website during working hours for immediate assistance.
                </div>
              </div>
            </div>
          </li>
          
          {/* Question 2 */}
          <li className="group">
            <button className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
              <span className="flex-1 text-base-content">What are the helpdesk hours of operation?</span>
              <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out false"></rect>
                <rect y="7" width="16" height="2" rx="1" className="group-hover:opacity-0 transform origin-center rotate-90 transition-all duration-200 ease-out false"></rect>
              </svg>
            </button>
            <div className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden">
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">
                  Our helpdesk is available Monday to Friday, from 9 AM to 6 PM (EST). During weekends or holidays, response times may vary.
                </div>
              </div>
            </div>
          </li>
          
          {/* Question 3 */}
          <li className="group">
            <button className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
              <span className="flex-1 text-base-content">What should I do if I need urgent assistance?</span>
              <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out false"></rect>
                <rect y="7" width="16" height="2" rx="1" className="group-hover:opacity-0 transform origin-center rotate-90 transition duration-200 ease-out false"></rect>
              </svg>
            </button>
            <div className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden">
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">
                  If you need urgent assistance, please call our emergency helpdesk at 1-800-EMERGENCY or use the live chat feature on our website for priority support.
                </div>
              </div>
            </div>
          </li>

          {/* Question 4 */}
          <li className="group">
            <button className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
              <span className="flex-1 text-base-content">How can I track my helpdesk request?</span>
              <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out false"></rect>
                <rect y="7" width="16" height="2" rx="1" className="group-hover:opacity-0 transform origin-center rotate-90 transition duration-200 ease-out false"></rect>
              </svg>
            </button>
            <div className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden">
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">
                  You can track the status of your helpdesk request by logging into your account on our website and navigating to the "My Tickets" section.
                </div>
              </div>
            </div>
          </li>

         
        </ul>
      </div>
    </div>
  );
};

export default faqs;
