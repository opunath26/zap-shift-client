import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to="/" className="group inline-block focus:outline-none">
      <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
        
        {/* Custom SVG Icon for ZapShift */}
        <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 p-1.5 rounded-xl transition-colors duration-300">
          <svg
            className="w-6 md:w-7 h-6 md:h-7 text-primary transition-transform group-hover:translate-x-1 duration-300 ease-in-out"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Speed Arrow / Shift Trail */}
            <path d="M13 5l7 7-7 7" />
            <path d="M4 12h16" />
            {/* Express Parcel Box Accent */}
            <path d="M3 6h4l2 3" />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex items-baseline font-black text-xl md:text-2xl tracking-tight select-none">
          <span className="group-hover:text-primary text-base-content transition-colors duration-300">
            Zap
          </span>
          <span className="text-primary transition-all group-hover:translate-x-0.5 duration-300">
            Shift
          </span>
          {/* Pulsing Dot */}
          <span className="bg-primary ms-0.5 rounded-full w-1.5 h-1.5 animate-pulse"></span>
        </div>

      </div>
    </Link>
  );
};

export default Logo;