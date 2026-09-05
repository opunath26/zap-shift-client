import React from 'react';
import { FaBoxes } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
      {/* Animated Icon & Pulse Ring */}
      <div className="relative flex justify-center items-center">
        {/* Outer Spinning Ring */}
        <div className="border-4 border-primary/20 border-t-primary rounded-full w-20 h-20 animate-spin"></div>
        
        {/* Center Parcel Icon */}
        <div className="absolute text-primary text-2xl animate-bounce">
          <FaBoxes />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h3 className="font-bold text-gray-700 text-lg animate-pulse">
          Zap-<span className="text-primary">Shift</span>
        </h3>
        <p className="mt-1 text-gray-400 text-xs uppercase tracking-widest">
          Fetching Parcel Data...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;