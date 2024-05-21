import React from 'react';
import './Project.css';

const Project = ({ project }) => {
    return (
        <div className="project-card">
            <h3>{project.name}</h3>
            <ul>
                {project.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}

export default Project;
