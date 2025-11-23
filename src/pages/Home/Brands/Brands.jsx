import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonster from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_prople from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, amazon_vector, casio, moonster, randstad, star, start_prople];

const Brands = () => {
    return (
        <div className='m-20 p-15'>
            <div>
                <h2 className='mb-20 font-bold text-secondary text-4xl text-center'>We've helped thousands of sales teams</h2>
            </div>
            <Swiper
            loop={true}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
          delay: 1000,
          disableOnInteraction: false,
            }}
        >
            {
                brandLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <img src={logo} alt={`Brand Logo ${index + 1}`} className="mx-auto h-10" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </div>
    );
};

export default Brands;