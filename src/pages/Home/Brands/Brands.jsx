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
    <section className="bg-gray-50/50 py-12 sm:py-16">
      <div className="mx-auto px-4 max-w-6xl">
        <h2 className="mb-8 font-bold text-secondary text-2xl sm:text-3xl lg:text-4xl text-center">
          Trusted by Top E-commerce Brands & Businesses
        </h2>

        <Swiper
          loop={true}
          speed={3000}
          spaceBetween={30}
          grabCursor={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
          }}
          className="flex items-center"
        >
          {brandLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Brand Logo ${index + 1}`}
                className="opacity-60 hover:opacity-100 hover:filter-none grayscale h-8 sm:h-10 object-contain transition-all duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;