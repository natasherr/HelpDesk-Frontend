import React from 'react';

const About = () => {
  return (
    <div className="sm:flex flex-col max-w-screen-xl mx-auto">
      {/* About Us Section */}
      <div className="sm:flex items-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" alt="Helpdesk Image" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About Us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">Why <span className="text-indigo-600">Our Helpdesk</span> Matters</h2>
            <p className="text-white-700">
              At <span className="font-semibold text-indigo-600">Our Company</span>, we believe that customer support is the backbone of a successful business. Our dedicated helpdesk team ensures that all your concerns and inquiries are addressed promptly, professionally, and with care. We strive to provide not just answers, but solutions, empowering our customers with the assistance they need to succeed.
            </p>
            <p className="text-white-700 mt-4">
              Whether you're facing technical issues, need guidance, or simply want to learn more about our products, our helpdesk is always ready to provide the support you deserve. We are here to make your experience with our services seamless and hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* Location Section with Helpdesk Information */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Explore Our Helpdesk Application</h2>
            <p className="mt-4 text-lg text-gray-500">Your one-stop solution for customer support and problem-solving.</p>
          </div>
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden">
                {/* You can replace the iframe source with an internal link to your helpdesk app or showcase how it works */}
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
  width="100%" height="480" style={{ border: '0' }} allowFullScreen="" loading="lazy"></iframe>
              </div>
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">About Our Helpdesk Application</h3>
                    <p className="mt-1 text-gray-600">
                      Our Helpdesk Application is designed to provide quick and effective solutions to any technical or service-related issues you may have. With user-friendly features, instant chat support, and an intuitive interface, you can easily submit your issues and track their resolutions.
                    </p>
                    <p className="mt-1 text-gray-600">
                      We offer real-time assistance through various channels such as live chat, email support, and detailed FAQs to make sure you get the help you need whenever you need it. The application aims to simplify problem resolution, ensuring your experience is smooth and stress-free.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Helpdesk Features</h3>
                    <ul className="mt-1 text-gray-600 space-y-2">
                      <li>Real-time chat support with agents</li>
                      <li>Ticketing system for issue tracking</li>
                      <li>Comprehensive FAQs and guides</li>
                      <li>Support across various communication channels (email, chat, and more)</li>
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">Get In Touch</h3>
                    <p className="mt-1 text-gray-600">Email: support@ourhelpdeskapp.com</p>
                    <p className="mt-1 text-gray-600">Phone: +1 800-123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
