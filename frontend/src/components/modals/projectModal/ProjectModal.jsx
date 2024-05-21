import React, { useEffect, useState } from 'react';
import simpleLogo from '../../../assets/simpleLogo.png';
import { Modal, TextInput, Textarea, Button } from '@mantine/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
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
        if (!projectData.name) {
            toast.warn('Project Name is required!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast-warning'
            });
            return;
        }
        onSubmit(projectData);
    };

    if (!isOpen) return null;

    return (
        <>
            <ToastContainer /> 
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
                        />
                        <Button onClick={handleSubmit} className="submit-button">Save Project</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectModal;