import React, { useEffect, useState } from 'react';
import logo from '../../assets/fullLogo.png';
import simpleLogo from '../../assets/simpleLogo.png';
import './Header.css';
import { Button } from '@mantine/core';
import ProjectModal from '../modals/projectModal/ProjectModal';

const Header = ({ handleCreateProject, setShowCompletedTasks_arg, showCompletedTasks_arg }) => {
    const [showCompletedTasks, setShowCompletedTasks] = useState(showCompletedTasks_arg);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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
        handleCreateProject(projectData);
        setIsProjectModalOpen(false);
    };

    const handleCheckboxChange = (e) => {
        setShowCompletedTasks(e.target.checked);
        setShowCompletedTasks_arg(e.target.checked);
    };

    return (
        <>
            <div className="header">
                <label className="switch-label">
                    <input 
                        type="checkbox" 
                        className="switch-input" 
                        checked={showCompletedTasks} 
                        onChange={handleCheckboxChange} 
                    />
                    <span className="switch-slider"></span>
                    <span>Show completed tasks?</span>
                </label>
                <img src={isSmallScreen ? simpleLogo : logo} alt="Logo" className="logo" />
                <Button onClick={openProjectModal} className="create-button">Create New Project</Button>
            </div>
            {isProjectModalOpen && (
                <ProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={{}}
                />
            )}
        </>
    );
};

export default Header;
