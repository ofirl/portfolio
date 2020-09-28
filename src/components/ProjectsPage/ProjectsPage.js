import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
    return (
        <div>
            ProjectsPage
            <Link to="/technologies"> technologies </Link>
            <Link to="/"> home </Link>
        </div>
    );
}

export default ProjectsPage;