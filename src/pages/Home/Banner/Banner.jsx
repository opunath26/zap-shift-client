import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

const bannerImages = [
  { id: 1, src: bannerImg1, alt: "Delivery Service Banner 1" },
  { id: 2, src: bannerImg2, alt: "Delivery Service Banner 2" },
  { id: 3, src: bannerImg3, alt: "Delivery Service Banner 3" },
];

const Banner = () => {
  return (
    <section className="mx-auto px-4 py-6 sm:py-10 max-w-7xl">
      <div className="shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={800}
          swipeable={true}
          emulateTouch={true}
          stopOnHover={true}
        >
          {bannerImages.map((banner) => (
            <div key={banner.id} className="w-full h-[250px] sm:h-[400px] md:h-[500px]">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;