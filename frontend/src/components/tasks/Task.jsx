// Task.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Task.css';

const Task = ({ task }) => {
    return (
        <div className="task-card">
            <div className="task-header">
                <div className="task-title">{task.name}</div>
                <div className="task-buttons">
                    <button>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button>
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
