import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center bg-base-200/60 p-4 min-h-screen overflow-hidden">
      {/* Background Decorative Glow Effects */}
      <div className="-top-32 -left-32 absolute bg-primary/10 blur-3xl rounded-full w-96 h-96 pointer-events-none" />
      <div className="-right-32 -bottom-32 absolute bg-secondary/10 blur-3xl rounded-full w-96 h-96 pointer-events-none" />

      <div className="z-10 relative w-full max-w-md text-center">
        {/* Main Glassmorphism Card */}
        <div className="space-y-6 bg-base-100/80 shadow-2xl backdrop-blur-md p-8 md:p-10 border border-base-300 rounded-3xl">
          
          {/* Brand Favicon / Logo Section */}
          <div className="flex justify-center">
            <div className="group relative bg-base-200/80 shadow-inner p-4 border border-base-300 rounded-2xl hover:scale-105 transition-transform duration-300">
              <img
                src="/favicon.ico"
                alt="Website Favicon"
                className="w-14 h-14 object-contain animate-pulse"
                onError={(e) => {
                  // Fallback icon if favicon.ico path is missing
                  e.target.onerror = null;
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/825/825590.png";
                }}
              />
              <span className="-top-2 -right-2 absolute bg-rose-500 shadow-sm px-2 py-0.5 rounded-full font-extrabold text-[10px] text-white uppercase tracking-wider">
                Error
              </span>
            </div>
          </div>

          {/* 404 Header */}
          <div className="space-y-1">
            <h1 className="bg-clip-text bg-gradient-to-r from-primary to-secondary font-black text-transparent text-6xl tracking-tight">
              404
            </h1>
            <h2 className="font-bold text-base-content text-xl">
              Page Not Found
            </h2>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-xs text-xs md:text-sm text-base-content/60 leading-relaxed">
            The page you are trying to reach doesn't exist, has been relocated, or is temporarily unavailable.
          </p>

          {/* Quick Divider */}
          <div className="my-2 text-xs text-base-content/30 divider">ZAP-SHIFT</div>

          {/* Action Buttons */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-base-200 px-5 border-base-300 rounded-xl btn-outline w-full sm:w-auto h-10 min-h-[2.5rem] font-semibold text-xs text-base-content btn"
            >
              ← Go Back
            </button>

            <Link
              to="/"
              className="shadow-md shadow-primary/20 px-5 rounded-xl w-full sm:w-auto h-10 min-h-[2.5rem] font-semibold text-white text-xs btn btn-primary"
            >
              Back to Home 
            </Link>
          </div>

        </div>

        {/* Footer Note */}
        <p className="mt-6 font-medium text-[11px] text-base-content/40">
          If you believe this is a technical issue, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;