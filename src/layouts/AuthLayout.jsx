import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='space-y-8 mx-auto mt-10 p-6 max-w-5xl'>
            <Logo />

            <div className='flex'>
                
                {/* Left Side (Form) */}
                <div className='flex-1'>
                    <Outlet />
                </div>

                {/* Right Side (Image Section with BG Color) */}
                <div className='flex flex-1 justify-center items-center bg-[#F4F8E8] p-6 rounded-xl'>
                    <img src={authImage} alt="" className='max-w-sm' />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;
