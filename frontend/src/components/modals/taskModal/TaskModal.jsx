import React, { useState } from 'react';
import '../Modal.css';
import simpleLogo from '../../../assets/simpleLogo.png';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData = {}, projectId }) => {
    const [taskData, setTaskData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        done: initialData.done || false,
        projectId: projectId || initialData.projectId
    });

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
            <div className="modal-content">
                <div className="modal-header">
                    <img src={simpleLogo} alt="Logo" className="modal-logo" />
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Task Name</label>
                            <input type="text" id="name" name="name" value={taskData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Task Description</label>
                            <textarea id="description" name="description" value={taskData.description} onChange={handleChange} required />
                        </div>
                        <button type="submit">Save Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
