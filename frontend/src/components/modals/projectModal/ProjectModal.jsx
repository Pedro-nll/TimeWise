import React, { useEffect, useState } from 'react';
import simpleLogo from '../../../assets/simpleLogo.png';
import { Modal, TextInput, Textarea, Button } from '@mantine/core';
import '../Modal.css';
import ModalHeader from '../ModalHeader';

const ProjectModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const [projectData, setProjectData] = useState({
        name: initialData.name || '',
        description: initialData.description || ''
    });

    useEffect(() => {
        setProjectData({
            name: initialData.name || '',
            description: initialData.description || ''
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(projectData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <ModalHeader onClose={onClose}></ModalHeader>
                <div className="modal-body">
                    <TextInput
                        label="Project Name"
                        name="name"
                        value={projectData.name}
                        onChange={handleChange}
                        required
                    />
                    <Textarea
                        label="Project Description"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        required
                    />
                    <Button onClick={handleSubmit} className="submit-button">Save Project</Button>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
