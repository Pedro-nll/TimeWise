import React, { useEffect, useState } from 'react';
import logo from '../../assets/fullLogo.png';
import simpleLogo from '../../assets/simpleLogo.png';
import './Header.css';
import { Button } from '@mantine/core';
import ProjectModal from '../modals/projectModal/ProjectModal';

const Header = ({handleCreateProject}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openProjectModal = () => {
        setIsProjectModalOpen(true);
    };

    const handleSubmit = (projectData) => {
        handleCreateProject(projectData)
        setIsProjectModalOpen(false)
    }

    return (
        <>
            <div className="header">
                <img src={isSmallScreen ? simpleLogo : logo} alt="Logo" className="logo" />
                <Button onClick={() => openProjectModal()} className='create-button'>Create New Project</Button>
            </div>
            {isProjectModalOpen && <ProjectModal
                        isOpen={isProjectModalOpen}
                        onClose={() => setIsProjectModalOpen(false)}
                        onSubmit={handleSubmit}
                        initialData={{}}
                    />}
        </>
    );
}

export default Header;