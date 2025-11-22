import React from 'react';

import logo from '../../assets/logo.png';


const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h3 className='-ms-2.5 font-bold text-2xl'>ZapShift</h3>
        </div>
    );
};

export default Logo;