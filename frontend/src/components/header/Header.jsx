import React, { useEffect, useState } from 'react';
import logo from '../../assets/fullLogo.png';
import simpleLogo from '../../assets/simpleLogo.png';
import './Header.css';
import { Button } from '@mantine/core';
import CreateProjectModal from '../modals/createProject/CreateProjectModal';

const Header = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCreateProject = () => {
        setModalOpen(true);
    };

    return (
        <>
            <div className="header">
                <img src={isSmallScreen ? simpleLogo : logo} alt="Logo" className="logo" />
                <Button onClick={handleCreateProject} className="create-button">Create New Project</Button>
            </div>
            {modalOpen && <CreateProjectModal onClose={() => setModalOpen(false)} />}
        </>
    );
}

export default Header;