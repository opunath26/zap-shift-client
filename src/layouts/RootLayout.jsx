import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer.jsx';
import Navbar from '../pages/Shared/Navbar/Navbar.jsx';

const RootLayout = () => {
    return (
        <div className='mx-auto max-w-7xlbg-'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;