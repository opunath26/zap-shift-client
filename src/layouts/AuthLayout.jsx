import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className="mx-auto max-w-6xl space-y-6 min-h-screen p-4 sm:p-6 md:p-10 flex flex-col justify-center">
            {/* Header Logo */}
            <div className="flex justify-start">
                <Logo />
            </div>

            {/* Main Container */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden p-4 md:p-8">
                
                {/* Left Side (Form) */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Right Side (Image Section) */}
                <div className="w-full md:w-1/2 flex justify-center items-center bg-[#F4F8E8] p-8 md:p-12 rounded-xl">
                    <img 
                        src={authImage} 
                        alt="Authentication Illustration" 
                        className="w-full max-w-sm object-contain h-auto" 
                    />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;