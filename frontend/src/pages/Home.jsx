import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import './Home.css';
import { APIReq } from '../APIReq';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProjectModal from '../components/modals/projectModal/ProjectModal';
import TaskModal from '../components/modals/taskModal/TaskModal';
import DeleteModal from '../components/modals/deleteModal/deleteModal';
import Task from '../components/tasks/Task';

let newProjectId = null; 
let newTaskId = null;

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [enteringProject, setEnteringProject] = useState(null);
    const [leavingProject, setLeavingProject] = useState(null);
    const [enteringTask, setEnteringTask] = useState(null);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [modalType, setModalType] = useState('create');
    const [taskModalType, setTaskModalType] = useState('create');
    const [currentTask, setCurrentTask] = useState(null);
    const [modalClass, setModalClass] = useState(''); // For modal animation

    useEffect(() => {
        fetch_data();
    }, []);

    async function fetch_data() {
        const REST = new APIReq();
        try {
            const response = await REST.getRequest("/projects/all");
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

    const filterCompletedTasks = (projects) => {
        return projects.map(project => ({
            ...project,
            tasks: project.tasks.filter(task => !task.completed)
        }));
    };

    const handleCompleteTask = (taskId) => {
        const taskElement = document.getElementById(`task-${taskId}`);
        if (taskElement) {
            taskElement.classList.add('task-complete');
            setTimeout(() => {
                setProjects((prevProjects) =>
                    prevProjects.map((project) => ({
                        ...project,
                        tasks: project.tasks.filter((task) => task.id !== taskId)
                    }))
                );
            }, 1000); // Match this duration with the CSS animation duration
        }
    };

    // const x = document.querySelectorAll('.task-card')
    // x.forEach(y => {
    //     y.style.background = 'green'
    // })

    const handleDeleteTask = (task) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => ({
                ...project,
                tasks: project.tasks.filter((task) => task.id !== taskId)
            }))
        );
    }

    const handleEditTask = async (task) => {
        const REST = new APIReq();
        console.log(task);
        try {
            const body = JSON.stringify(task);
            const response = await REST.putRequest(`/tasks/${task.id}`, body);
            if (response.status === 200) {
                setProjects((prevProjects) =>
                    prevProjects.map((project) => ({
                        ...project,
                        tasks: project.tasks.map((t) =>
                            t.id === task.id ? { ...t, ...task } : t
                        ),
                    }))
                );
                setIsTaskModalOpen(false);
            } else {
                console.error("Failed to update task:", response);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    

    const handleCreateProject = async (projectData) => {
        const REST = new APIReq();
        try {
            const body = JSON.stringify(projectData);
            const response = await REST.postRequest('/projects', body);
            if (response.status === 200) {
                const newProject = response.data.project;
                newProjectId = newProject.id;
                setProjects((prevProjects) => {
                    setEnteringProject(newProjectId);
                    return [...prevProjects, newProject];
                });
                setIsProjectModalOpen(false);
                setTimeout(() => {
                    setEnteringProject(null);
                    setProjects((prevProjects) => 
                        prevProjects.map((project) =>
                            project.id === newProjectId ? { ...project, glow: true } : project
                        )
                    );
                    setTimeout(() => {
                        setProjects((prevProjects) =>
                            prevProjects.map((project) =>
                                project.id === newProjectId ? { ...project, glow: false } : project
                            )
                        );
                    }, 1000); // Glow duration must match the CSS animation duration
                }, 300);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleEditProject = async (projectData) => {
        const REST = new APIReq();
        try {
            const body = JSON.stringify(projectData);
            const response = await REST.putRequest(`/projects/${currentProject.id}`, body);
            if (response.status === 200) {
                const data = response.data.project
                setProjects(projects.map(project => project.id === currentProject.id ? data : project));
                setIsProjectModalOpen(false);
            }
        } catch (error) {
            console.error('Error editing project:', error);
        }
    };

    const handleDeleteProject = async () => {
        const REST = new APIReq();
        try {
            const response = await REST.deleteRequest(`/projects/${currentProject.id}`);
            if (response.status === 200) {
                const projectId = currentProject.id;
                setLeavingProject(projectId);
                setIsDeleteModalOpen(false);
                setTimeout(() => {
                    setProjects(projects.filter(project => project.id !== projectId));
                    setLeavingProject(null);
                }, 300);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleCreateTask = async (taskData) => {
        const REST = new APIReq();
        taskData.projectId = taskData.projectId == null ? currentProject.id : taskData.projectId;
        try {
            const body = JSON.stringify(taskData);
            const response = await REST.postRequest('/tasks', body);
            if (response.status === 200) {
                const newTask = response.data.task;
                newTaskId = newTask.id;
                const updatedProjects = await REST.getRequest("/projects/all-with-tasks");
                if (Array.isArray(updatedProjects)) {
                    setProjects(updatedProjects);
                    setEnteringTask(newTaskId);
                    setTimeout(() => {
                        setEnteringTask(null);
                        setProjects((prevProjects) => 
                            prevProjects.map((project) => ({
                                ...project,
                                tasks: project.tasks.map((task) =>
                                    task.id === newTaskId ? { ...task, glow: true } : task
                                )
                            }))
                        );
                        setTimeout(() => {
                            setProjects((prevProjects) => 
                                prevProjects.map((project) => ({
                                    ...project,
                                    tasks: project.tasks.map((task) =>
                                        task.id === newTaskId ? { ...task, glow: false } : task
                                    )
                                }))
                            );
                        }, 1000); // Glow duration must match the CSS animation duration
                    }, 300);
                } else if (typeof updatedProjects === 'object' && updatedProjects !== null) {
                    setProjects([updatedProjects]);
                } else {
                    console.error("Unexpected response format:", updatedProjects);
                }
                setIsTaskModalOpen(false);
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const openProjectModal = (type, project = null) => {
        setModalType(type);
        setCurrentProject(project);
        setIsProjectModalOpen(true);
        setModalClass('modal-enter');
    };

    const closeModal = () => {
        setModalClass('modal-exit');
        setTimeout(() => {
            setIsProjectModalOpen(false);
            setIsTaskModalOpen(false);
            setIsDeleteModalOpen(false);
            setModalClass('');
        }, 300); 
    };

    const openTaskModal = (project) => {
        setTaskModalType('create')
        setCurrentProject(project);
        setCurrentTask(null)
        setIsTaskModalOpen(true);
        setModalClass('modal-enter');
    };

    const openTaskModalEditing = (task) => {
        setTaskModalType('edit')
        setCurrentTask(task)
        setIsTaskModalOpen(true);
        setModalClass('modal-enter')
    }

    const openDeleteModal = (project) => {
        setCurrentProject(project);
        setIsDeleteModalOpen(true);
        setModalClass('modal-enter');
    };

    return (
        <>
            <header>
                <Header handleCreateProject={handleCreateProject}/>
            </header>
            <div className='body'>
                <div className="grid-container">
                    {projects.map((project) => (
                        <div key={project.id} 
                             className={`project-card ${
                                 project.id === newProjectId ? 'glow' : '' 
                             } ${project.id === enteringProject ? 'enter enter-active' : ''} 
                             ${project.id === leavingProject ? 'exit exit-active' : ''}`}>
                            <div className="project-header">
                                <div className="project-title">{project.name}</div>
                                <div className="project-buttons">
                                    <button onClick={() => openProjectModal('edit', project)}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button onClick={() => openTaskModal(project)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button onClick={() => openDeleteModal(project)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className="project-description">{project.description}</div>
                            <div className="task-list">
                                {project.tasks && project.tasks
                                    .filter((task) => !task.done)
                                    .map((task) => (
                                        <div key={task.id} 
                                            className={`${task.id === newTaskId ? 'glow' : ''} 
                                            ${task.id === enteringTask ? 'enter enter-active' : ''}`}>
                                            <Task
                                                task={task}
                                                onComplete={handleCompleteTask}
                                                onDelete={handleDeleteTask}
                                                onEdit={handleEditTask}
                                                openModal={openTaskModalEditing}
                                            />
                                        </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <ProjectModal
                        isOpen={isProjectModalOpen}
                        onClose={closeModal}
                        onSubmit={modalType === 'create' ? handleCreateProject : handleEditProject}
                        initialData={modalType === 'edit' ? currentProject : {}}
                        className={modalClass} 
                    />
                    <TaskModal
                        isOpen={isTaskModalOpen}
                        onClose={closeModal}
                        onSubmit={taskModalType === 'edit' ? handleEditTask : handleCreateTask}
                        projectId={taskModalType === 'edit' ? currentTask?.projectId : currentProject?.id}
                        initialData={taskModalType === 'edit' ? currentTask : {}}
                        className={modalClass}
                    />
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeModal}
                        onConfirm={handleDeleteProject}
                        itemName={currentProject?.name}
                        className={modalClass} 
                    />
                </div>
            </div>
        </>
    );
}

export default Home;
