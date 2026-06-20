import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectDashboard() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleCreateProject = (project) => {
        axios.post('/projects', project)
            .then(response => {
                setProjects([...projects, response.data]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Project Dashboard</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
            <form>
                <input type="text" placeholder="Project name" />
                <input type="text" placeholder="Project description" />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    const project = {
                        name: document.querySelector('input[type="text"]:first-child').value,
                        description: document.querySelector('input[type="text"]:last-child').value
                    };
                    handleCreateProject(project);
                }}>Create Project</button>
            </form>
        </div>
    );
}

export default ProjectDashboard;