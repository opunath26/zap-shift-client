import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonster from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_prople from '../../../assets/brands/start_people.png';

const brandLogos = [amazon, amazon_vector, casio, moonster, randstad, star, start_prople];

const Brands = () => {
  return (
    <section className="bg-gray-50/60 py-12 sm:py-16 border-gray-100 border-y overflow-hidden">
      <div className="mx-auto px-4 max-w-7xl">
        
        {/* Section Tag & Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-block bg-primary/20 mb-3 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-widest">
            Our Corporate Partners
          </span>
          <h2 className="font-extrabold text-secondary text-2xl sm:text-3xl lg:text-4xl">
            Trusted by Top E-commerce Brands & Businesses
          </h2>
        </div>

        {/* Continuous Marquee Swiper */}
        <Swiper
          loop={true}
          speed={4000}
          spaceBetween={30}
          grabCursor={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
          }}
          className="flex items-center brand-swiper-linear"
        >
          {brandLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center py-2">
              <div className="flex justify-center items-center bg-white/80 shadow-xs hover:shadow-md p-3 border border-gray-100/60 rounded-2xl w-full h-16 transition-all duration-300">
                <img
                  src={logo}
                  alt={`Brand Partner ${index + 1}`}
                  className="opacity-50 hover:opacity-100 grayscale hover:grayscale-0 h-7 sm:h-9 object-contain hover:scale-105 transition-all duration-300 transform"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;