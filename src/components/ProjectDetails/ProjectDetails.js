import { Dialog, Typography } from '@material-ui/core';
import React from 'react';

const ProjectDetails = ({ open, project, onClose }) => {
    return (
        <Dialog fullScreen open={open} onClose={onClose}>
            <Typography variant="h3">
                {project.title}
            </Typography>
        </Dialog>
    );
}

export default ProjectDetails;