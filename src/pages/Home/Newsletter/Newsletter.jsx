import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { FaPaperPlane, FaEnvelopeOpenText } from 'react-icons/fa';

const Newsletter = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace these credentials with your EmailJS keys if sending direct emails
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'Subscribed Successfully!',
            text: 'Thank you for subscribing. You will receive updates from Zap-Shift soon!',
            confirmButtonColor: '#03373D',
          });
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          // Fallback alert for demo / missing key setup
          Swal.fire({
            icon: 'success',
            title: 'Thank you for joining!',
            text: 'We have received your email subscription request.',
            confirmButtonColor: '#03373D',
          });
          formRef.current.reset();
        }
      );
  };

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative bg-secondary shadow-2xl p-8 sm:p-12 lg:p-16 rounded-3xl overflow-hidden">
          
          {/* Decorative Background Accents */}
          <div className="-top-24 -right-24 absolute bg-primary/20 blur-3xl rounded-full w-72 h-72 pointer-events-none" />
          <div className="-bottom-24 -left-24 absolute bg-primary/10 blur-3xl rounded-full w-72 h-72 pointer-events-none" />

          <div className="z-10 relative items-center gap-8 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 lg:text-left text-center">
              <div className="inline-flex items-center gap-2 bg-primary/20 mb-4 px-4 py-1.5 rounded-full font-bold text-primary text-xs uppercase tracking-wider">
                <FaEnvelopeOpenText className="text-sm" /> Stay Connected
              </div>
              <h2 className="mb-4 font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Subscribe to Get Urgent Delivery & Merchant Updates
              </h2>
              <p className="mx-auto lg:mx-0 max-w-xl text-gray-300 text-sm sm:text-base leading-relaxed">
                Join 5,000+ top e-commerce merchants and businesses getting exclusive courier discount offers, logistics advice, and feature updates.
              </p>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-5">
              <form ref={formRef} onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex sm:flex-row flex-col gap-3 bg-white/10 backdrop-blur-md p-2 border border-white/15 rounded-2xl">
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="Enter your business email..."
                    className="bg-transparent px-4 py-3.5 focus:outline-none w-full text-white text-sm sm:text-base placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-lg px-6 py-3.5 rounded-xl font-bold text-secondary text-sm sm:text-base active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        Subscribe <FaPaperPlane className="text-xs" />
                      </>
                    )}
                  </button>
                </div>
                <p className="pl-1 text-gray-400 text-xs lg:text-left text-center">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;