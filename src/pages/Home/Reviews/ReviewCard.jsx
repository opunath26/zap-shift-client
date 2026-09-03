import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { 
    userName, 
    review: testimonial, 
    user_photoURL, 
    designation, 
    rating = 5 
  } = review || {};

  return (
    <div className="flex flex-col justify-between bg-white hover:bg-gray-50/80 shadow-md hover:shadow-xl p-6 sm:p-8 border border-gray-100 rounded-2xl h-full transition-all duration-300 select-none">
      <div>
        {/* Top Header: Quote Icon & Rating */}
        <div className="flex justify-between items-center mb-4">
          <FaQuoteLeft className="text-primary text-2xl sm:text-3xl" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-sm ${
                  index < Math.floor(rating)
                    ? 'text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quote / Testimonial Text */}
        <p className="line-clamp-4 font-normal text-gray-600 text-sm sm:text-base leading-relaxed italic">
          "{testimonial}"
        </p>
      </div>

      <div>
        {/* Dashed Divider */}
        <div className="my-5 border-gray-200 border-t border-dashed"></div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="ring-2 ring-primary/20 rounded-full w-12 h-12 overflow-hidden shrink-0">
            <img
              src={user_photoURL || 'https://i.ibb.co/mR4qB2M/user-placeholder.png'}
              alt={userName || 'Customer'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
              {userName || 'Satisfied Customer'}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm truncate">
              {designation || 'E-commerce Merchant'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;