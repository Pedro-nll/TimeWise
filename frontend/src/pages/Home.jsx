import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Project from '../components/projects/Project';
import { Grid } from '@mantine/core';
import './Home.css';
import { APIReq } from '../APIReq';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            const REST = new APIReq();
            try {
                const response = await REST.getRequest("/projects/all-with-tasks");
                if (Array.isArray(response)) {
                    setProjects(response);
                } else if (typeof response === 'object' && response !== null) {
                    setProjects([response]);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        }
        fetch_data();
    }, []);

    return (
        <>
            <Header />
            <div className="grid-container">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="project-header">
                            <div className="project-title">{project.name}</div>
                            <div className="project-buttons">
                                <button>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                        <div className="project-description">
                            {project.description}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
