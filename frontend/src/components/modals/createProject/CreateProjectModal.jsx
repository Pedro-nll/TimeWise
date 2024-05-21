import React, { useState } from 'react';
import simpleLogo from '../../../assets/simpleLogo.png';
import { Modal, TextInput, Textarea, Button } from '@mantine/core';
import './CreateProjectModal.css';
import { APIReq } from '../../../APIReq';

const CreateProjectModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {

        const body = JSON.stringify({
            name,
            description,
        })

        const REST = new APIReq()
        const response = await REST.postRequest('/projects', body)
        if (response.ok) {
            onClose();
        } else {
            console.error('Failed to create project');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <img src={simpleLogo} alt="Logo" className="modal-logo" />
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-separator"></div>
                <TextInput
                    label="Project Name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    required
                />
                <Textarea
                    label="Project Description"
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                    required
                />
                <Button onClick={handleSubmit} className="submit-button">Create Project</Button>
            </div>
        </div>
    );
}

export default CreateProjectModal;
