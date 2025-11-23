import React from 'react';
import Banner from '../Banner/Banner';
import Work from '../Banner/Works';
import OurServices from '../Banner/OurServices';
import Brands from '../Brands/Brands';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Work></Work>
            <OurServices></OurServices>
            <Brands></Brands>
        </div>
    );
};

export default Home;