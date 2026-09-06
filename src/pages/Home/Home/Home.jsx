import React from 'react';
import Banner from '../Banner/Banner';
import Work from '../Banner/Works';
import OurServices from '../Banner/OurServices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import PricingCalculator from '../PricingCalculator/PricingCalculator';
import StatsSection from '../StatsSection/StatsSection';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import JoinBanner from '../JoinBanner/JoinBanner';
import FAQ from '../FAQ/FAQ';
import Newsletter from '../Newsletter/Newsletter';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());


const Home = () => {
    return (
        <div>
            <Banner />
            <StatsSection />
            <PricingCalculator />
            <Work />
            <OurServices />
            <WhyChooseUs />
            <JoinBanner />
            <FAQ />
            <Brands />
            <Reviews reviewsPromise={reviewsPromise} />
            <Newsletter />
        </div>
    );
};

export default Home;