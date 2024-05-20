import React, { useEffect, useState } from 'react';
import logo from '../../assets/fullLogo.png';
import simpleLogo from '../../assets/simpleLogo.png';
import './Header.css';

const Header = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="header">
            <img src={isSmallScreen ? simpleLogo : logo} alt="Logo" className="logo" />
        </div>
    );
}

export default Header;