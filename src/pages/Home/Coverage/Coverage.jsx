import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSearch, FaCity, FaPhoneAlt } from 'react-icons/fa';

const Coverage = () => {
  // Service centers loaded via router loader
  const serviceCenters = useLoaderData() || [];
  const [searchTerm, setSearchTerm] = useState('');

  // Filter centers based on district or covered areas
  const filteredCenters = serviceCenters.filter((center) => {
    const search = searchTerm.toLowerCase();
    const districtMatch = center.district?.toLowerCase().includes(search);
    const areaMatch = center.coveredAreas?.some((area) =>
      area.toLowerCase().includes(search)
    );
    return districtMatch || areaMatch;
  });

  return (
    <div className="bg-base-100 py-12 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center"
      >
        <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl">
          Our Delivery <span className="text-primary">Coverage Area</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-lg">
          We deliver parcels across all 64 districts. Search your district or area to find your nearest Zap-Shift hub.
        </p>

        {/* Search Input Bar */}
        <div className="relative mx-auto mt-8 max-w-xl">
          <div className="left-0 absolute inset-y-0 flex items-center pl-4 text-gray-400 pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by District or Area (e.g., Dhaka, Mirpur)..."
            className="shadow-sm py-3 pr-4 pl-11 focus:border-primary rounded-full focus:outline-none w-full text-gray-800 input input-bordered"
          />
        </div>
      </motion.div>

      {/* Grid List Section */}
      <div className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {filteredCenters.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCenters.map((center, index) => (
              <motion.div
                key={center.id || index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col justify-between bg-base-100 shadow-sm hover:shadow-md p-6 border border-gray-100 rounded-2xl transition-all"
              >
                <div>
                  {/* District Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary text-xl">
                      <FaCity />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-xl">
                        {center.district}
                      </h3>
                      <p className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
                        <FaMapMarkerAlt className="text-primary" /> {center.hubName || 'Central Hub'}
                      </p>
                    </div>
                  </div>

                  {/* Covered Areas Tags */}
                  <div className="mb-4">
                    <p className="mb-2 font-semibold text-gray-400 text-xs uppercase tracking-wider">
                      Covered Areas:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {center.coveredAreas?.map((area, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 px-2.5 py-1 rounded-lg font-medium text-gray-700 text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Footer */}
                {center.contact && (
                  <div className="flex justify-between items-center pt-4 border-gray-100 border-t text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                      <FaPhoneAlt className="text-primary" /> {center.contact}
                    </span>
                    <span className="text-white badge badge-sm badge-success">Active Hub</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center">
            <p className="text-gray-500 text-xl">No service center found matching "{searchTerm}"</p>
            <p className="mt-2 text-gray-400 text-sm">Try searching for a different district or area name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coverage;