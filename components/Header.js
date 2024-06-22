import React from 'react';
import SideBar from './SideBar';

const Header = () => {
    return (
        <header>
            <SideBar className="header-button" />
            <p className='header-title'>ATENEO TUITION FEE</p>
        </header>
    );
};

export default Header;
