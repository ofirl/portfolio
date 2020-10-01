import React from 'react';

import ProjectListItem from '../ProjectListItem/ProjectListItem';
import PageTemplate from '../PageTemplate/PageTemplate';

import { projects } from '../../utils/projects';

const ProjectPage = () => {
    const nodes = [
        {
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
            title: 'Personal',
            image: "/assets/images/logos/personalProjects.png",
            description: [
                'Always :)',
                'Jack Of All Trades'
            ]
        },
    ];

    return (
        <PageTemplate nodes={nodes} swiperItems={projects} swiperFilterKey={'timeline'} swiperItemComponent={ProjectListItem} />
    );
}

export default ProjectPage;