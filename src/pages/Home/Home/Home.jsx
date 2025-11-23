import React from 'react';
import Banner from '../Banner/Banner';
import Work from '../Banner/Works';
import OurServices from '../Banner/OurServices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Work></Work>
            <OurServices></OurServices>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;