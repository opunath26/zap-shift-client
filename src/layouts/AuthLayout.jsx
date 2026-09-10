import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className="flex flex-col justify-center space-y-6 mx-auto p-4 sm:p-6 md:p-10 max-w-6xl min-h-screen">
            {/* Header Logo */}
            <div className="flex justify-start">
                <Logo />
            </div>

            {/* Main Container */}
            <div className="flex md:flex-row flex-col items-center gap-8 bg-white shadow-sm p-4 md:p-8 border border-gray-100 rounded-2xl overflow-hidden">
                
                {/* Left Side (Form) */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Right Side (Image Section) */}
                <div className="flex justify-center items-center bg-[#F4F8E8] p-8 md:p-12 rounded-xl w-full md:w-1/2">
                    <img 
                        src={authImage} 
                        alt="Authentication Illustration" 
                        className="w-full max-w-sm h-auto object-contain" 
                    />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;