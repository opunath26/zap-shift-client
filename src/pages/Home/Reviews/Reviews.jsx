import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';
import customerTop from '../../../assets/banner/customer-top.png';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  // Optional: Safety check if reviews is undefined/empty
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-20 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex justify-center items-center mb-6 w-full">
          <img src={customerTop} alt="Happy Customers" className="h-16 sm:h-24 object-contain" />
        </div>
        
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-secondary text-3xl sm:text-4xl lg:text-5xl">
            What Our Customers Are Saying
          </h2>
          <p className="mb-12 text-gray-600 text-sm sm:text-base leading-relaxed">
            From fast parcel dispatches to seamless corporate logistics — see how we deliver happiness and reliability right to our customers' doorsteps every day!
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative pb-10">
          <Swiper
            loop={true}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              scale: 0.85,
              slideShadows: false, // Turned off default harsh shadows
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="!pb-12" // Extra padding bottom for pagination bullets
          >
            {reviews.map(review => (
              <SwiperSlide key={review.id} className="py-4">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;