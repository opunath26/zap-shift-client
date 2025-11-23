import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;
    return (
        <div className="bg-[#eef1f2] shadow-lg p-6 border-gray-200 rounded-xl max-w-sm">
            {/* Quote Icon */}

            <FaQuoteLeft className="mb-4 text-primary text-2xl" />

            {/* Quote Text */}
            <p className="mb-4" >
                {testimonial}
                {/* {quote} */}
            </p>

            {/* Divider */}
            <div className='my-4 border-fray-300 border-t border-dashed'></div>

            {/* Profile */}
            <div className='flex items-center gap-4'>
                <div className='bg-primary rounded-full w-10 h-10'>
                    <img src={user_photoURL} alt="" />
                </div>
                <div>
                    <h3 className='font-semibold text-lg'>{userName}</h3>
                    <p className='text-gray-500 text-sm'>Senior Product Designer</p>
                </div>
            </div>
        </div>

    );
};

export default ReviewCard;