import React from 'react';

import ProjectListItem from '../ProjectListItem/ProjectListItem';
import PageTemplate from '../PageTemplate/PageTemplate';

import { projects } from '../../consts/projects';
import { routePaths } from '../../utils/animationUtils';

const ProjectPage = () => {
    const nodes = [
        {
            key: 'navy',
            title: 'Navy',
            image: "/assets/images/logos/navy.png",
            description: [
                'Oct 2015 - Mar 2019',
                'Full-Stack Developer',
                null,
                'Apr 2019 - Now',
                'Full-Stack Developers Team Leader',
            ]
        },
        {
            key: 'personal',
            title: 'Personal',
            image: "/assets/images/logos/personalProjects.png",
            description: [
                'Kinda Always',
                'Whatever It Takes'
            ]
        },
    ];

    return (
        <PageTemplate nodes={nodes} swiperItems={projects} swiperFilterKey={'timeline'} swiperItemComponent={ProjectListItem} pagePath={routePaths.timeline} />
    );
}

export default ProjectPage;