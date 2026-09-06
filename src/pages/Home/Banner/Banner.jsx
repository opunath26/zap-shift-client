import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { FaShippingFast, FaSearch, FaBox, FaShieldAlt } from 'react-icons/fa';

const Banner = () => {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  // Handle tracking form submission
  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // TODO: Connect with backend API when ready
    // e.g., navigate(`/track/${trackingId}`) or open tracking modal
    console.log("Tracking Parcel ID:", trackingId);
    alert(`Tracking request sent for ID: ${trackingId}`);
  };

  return (
    <div className="relative bg-gradient-to-br from-primary/20 via-base-100 to-secondary/5 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Text Content & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:text-left text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary shadow-sm px-4 py-2 rounded-full font-semibold text-white text-sm">
              <FaShippingFast className="text-primary animate-bounce" />
              <span>Fastest Parcel & Courier Service</span>
            </div>

            <h1 className="font-extrabold text-secondary text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Shift Your Parcels <br />
              <span className="inline-block bg-secondary mt-2 px-3 py-1 rounded-xl text-primary">With Speed</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-xl text-gray-600 text-lg">
              Reliable, secure, and real-time door-to-door courier service across 64 districts in Bangladesh.
            </p>

            {/* Quick Tracking Search Form */}
            <div className="mx-auto lg:mx-0 pt-2 max-w-md">
              <form onSubmit={handleTrack} className="flex sm:flex-row flex-col gap-2 bg-base-100 shadow-md p-1.5 border border-gray-200 focus-within:border-secondary rounded-2xl">
                <div className="flex items-center gap-2 px-3 grow">
                  <FaSearch className="text-secondary" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID (e.g., ZAP-88402)..."
                    className="bg-transparent py-2 focus:outline-none w-full text-gray-800 text-sm"
                  />
                </div>
                <button type="submit" className="bg-secondary hover:bg-secondary/90 px-6 border-none rounded-xl text-white btn">
                  Track
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link to="/send-parcel" className="bg-primary hover:bg-primary/80 shadow-md px-6 border-none rounded-xl font-bold text-secondary btn">
                Send Parcel
              </Link>
              <Link to="/coverage" className="hover:bg-secondary px-6 border-secondary rounded-xl btn-outline text-secondary hover:text-white btn">
                View Coverage Area
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="gap-4 grid grid-cols-3 mx-auto lg:mx-0 pt-6 border-gray-200/80 border-t max-w-md">
              <div className="flex items-center gap-2 font-semibold text-secondary text-xs">
                <FaBox className="text-secondary" />
                <span>Safe Handling</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-secondary text-xs">
                <FaShippingFast className="text-secondary" />
                <span>Same Day Pick</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-secondary text-xs">
                <FaShieldAlt className="text-secondary" />
                <span>100% Secured</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Background Glow Circle */}
            <div className="-z-10 absolute bg-primary/40 blur-3xl rounded-full w-72 lg:w-96 h-72 lg:h-96 animate-pulse"></div>

            {/* Floating Live Status Card */}
            <div className="relative space-y-6 bg-secondary shadow-2xl p-6 border border-secondary/20 rounded-3xl w-full max-w-lg text-white">
              <div className="flex justify-between items-center pb-4 border-white/10 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-3 rounded-2xl text-secondary text-2xl">
                    <FaBox />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Express Parcel Delivery</h4>
                    <p className="text-gray-300 text-xs">Order ID: #ZAP-88402</p>
                  </div>
                </div>
                <span className="bg-primary px-3 py-1 border-none font-bold text-secondary text-xs badge">In Transit</span>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-2">
                <div className="flex justify-between font-medium text-gray-300 text-xs">
                  <span>Picked Up</span>
                  <span className="font-bold text-primary">On the Way</span>
                  <span>Delivered</span>
                </div>
                <div className="bg-white/10 rounded-full w-full h-2 overflow-hidden">
                  <div className="bg-primary rounded-full w-2/3 h-full animate-pulse"></div>
                </div>
              </div>

              {/* Rider Info Badge */}
              <div className="flex justify-between items-center bg-white/5 p-3 border border-white/10 rounded-xl text-gray-200 text-xs">
                <span>Rider Assigned: <strong className="text-primary">Kabir Hossain</strong></span>
                <span className="font-semibold text-primary">EST: 2 Hours</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;