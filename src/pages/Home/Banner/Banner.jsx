import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaShippingFast, FaSearch, FaBox, FaShieldAlt } from 'react-icons/fa';

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-base-100 to-base-200 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Text Content & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:text-left text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full font-semibold text-primary text-sm">
              <FaShippingFast className="animate-bounce" />
              <span>Fastest Parcel & Delivery Service</span>
            </div>

            <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Shift Your Parcels <br />
              <span className="text-primary">With Lightning Speed</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-xl text-gray-600 text-lg">
              Reliable, secure, and real-time door-to-door courier service across 64 districts in Bangladesh. Track your parcels instantly.
            </p>

            {/* Quick Tracking Search Input */}
            <div className="mx-auto lg:mx-0 pt-2 max-w-md">
              <div className="flex sm:flex-row flex-col gap-2 bg-base-100 shadow-md p-1.5 border border-gray-200 rounded-2xl">
                <div className="flex items-center gap-2 px-3 grow">
                  <FaSearch className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID..."
                    className="bg-transparent py-2 focus:outline-none w-full text-gray-800 text-sm"
                  />
                </div>
                <button className="px-6 rounded-xl text-white btn btn-primary">
                  Track
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link to="/send-parcel" className="shadow-lg shadow-primary/30 px-6 rounded-xl text-white btn btn-primary">
                Send Parcel
              </Link>
              <Link to="/coverage" className="hover:bg-gray-100 px-6 border-gray-300 rounded-xl btn-outline btn">
                View Coverage Area
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="gap-4 grid grid-cols-3 mx-auto lg:mx-0 pt-6 border-gray-200/80 border-t max-w-md">
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <FaBox className="text-primary" />
                <span>Safe Handling</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <FaShippingFast className="text-primary" />
                <span>Same Day Pick</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <FaShieldAlt className="text-primary" />
                <span>100% Secured</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Background Glow Circle */}
            <div className="-z-10 absolute bg-primary/20 blur-3xl rounded-full w-72 lg:w-96 h-72 lg:h-96 animate-pulse"></div>

            {/* Floating Card Illustration */}
            <div className="relative space-y-6 bg-base-100/80 shadow-2xl backdrop-blur-md p-6 border border-gray-100 rounded-3xl w-full max-w-lg">
              <div className="flex justify-between items-center pb-4 border-gray-100 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary text-2xl">
                    <FaBox />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Express Parcel Delivery</h4>
                    <p className="text-gray-400 text-xs">Order ID: #ZAP-88402</p>
                  </div>
                </div>
                <span className="font-semibold text-white text-xs badge badge-success">In Transit</span>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-2">
                <div className="flex justify-between font-medium text-gray-500 text-xs">
                  <span>Picked Up</span>
                  <span className="font-bold text-primary">On the Way</span>
                  <span>Delivered</span>
                </div>
                <div className="bg-gray-200 rounded-full w-full h-2 overflow-hidden">
                  <div className="bg-primary rounded-full w-2/3 h-full animate-pulse"></div>
                </div>
              </div>

              {/* Rider Info Badge */}
              <div className="flex justify-between items-center bg-base-200/60 p-3 rounded-xl text-gray-600 text-xs">
                <span>Rider Assigned: <strong>Kabir Hossain</strong></span>
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