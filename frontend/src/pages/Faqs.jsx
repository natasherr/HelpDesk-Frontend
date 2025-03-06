import React, { useContext } from 'react';
import { HelpContext } from '../context/HelpContext';

const Faqs = () => {
  const { faqs } = useContext(HelpContext);

  return (
    <div className="relative isolate overflow-hidden bg-custom">
      <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col text-left">
          <p className="inline-block font-semibold text-primary mb-4">F.A.Q</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
        </div>
        
        <ul className="w-full flex flex-col gap-4">
          {faqs && faqs.map(faq => (
            <li key={faq.id} className="group border-t border-base-content/10 py-5">
              <button className="relative flex items-center w-full text-base font-semibold text-left md:text-lg" aria-expanded="false">
                <span className="flex-1 text-base-content">{faq.question}</span>
                <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out"></rect>
                  <rect y="7" width="16" height="2" rx="1" className="block group-hover:opacity-0 origin-center rotate-90 transition duration-200 ease-out"></rect>
                </svg>
              </button>
              <div className="transition-all duration-300 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden">
                <div className="pb-5 leading-relaxed">
                  <div className="space-y-2 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
