import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Work from '../Banner/Works';
import OurServices from '../Banner/OurServices';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import PricingCalculator from '../PricingCalculator/PricingCalculator';
import StatsSection from '../StatsSection/StatsSection';
import JoinBanner from '../JoinBanner/JoinBanner';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';
import Newsletter from '../Newsletter/Newsletter';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />
            <Work />
            <OurServices />
            <WhyChooseUs />
            <PricingCalculator />
            <StatsSection />
            <JoinBanner />
            <Reviews reviewsPromise={reviewsPromise} />
            <FAQ />
            <Newsletter />
        </div>
    );
};

export default Home;