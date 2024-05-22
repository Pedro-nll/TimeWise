// Task.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Task.css';
import { APIReq } from '../../APIReq';

const Task = ({ task, onComplete, openModal, openDeleteModal}) => {

    const handleComplete = async () => {
        const REST = new APIReq();
        try {
            await REST.postRequest(`/tasks/do/${task.id}`);
            onComplete(task.id);
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };



    return (
        <div className="task-card" id={`task-${task.id}`} style={{ backgroundColor: task.done ? 'darkgreen' : 'initial' }}>
            <div className="task-header">
                <div className="task-title">{task.name}</div>
                <div className="task-buttons">
                    <button onClick={() => openModal(task)}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={handleComplete}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => openDeleteModal(task)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            <div className="task-description">
                {task.description}
            </div>
        </div>
    );
};

export default Task;
