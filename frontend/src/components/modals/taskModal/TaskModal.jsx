import React, { useEffect, useState } from 'react';
import '../Modal.css';
import { Button, TextInput, Textarea } from '@mantine/core';
import ModalHeader from '../ModalHeader';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData, projectId }) => {
    const [taskData, setTaskData] = useState({
        id: '',
        name: '',
        description: '',
        done: false,
        projectId: projectId
    });

    useEffect(() => {
        if (initialData) {
            setTaskData({
                id: initialData.id || '',
                name: initialData.name || '',
                description: initialData.description || '',
                done: initialData.done || false,
                projectId: initialData.projectId || projectId
            });
        }
    }, [initialData, projectId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTaskData({
            ...taskData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <ModalHeader onClose={onClose}></ModalHeader>
                <div className="modal-body">
                    <TextInput
                        label="Task Name"
                        name="name"
                        value={taskData.name}
                        onChange={handleChange}
                        required
                    />
                    <Textarea
                        label="Task Description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    />
                    <Button onClick={handleSubmit} className="submit-button">Save Task</Button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
