import React from 'react';

import ProjectListItem from '../ProjectListItem/ProjectListItem';
import PageTemplate from '../PageTemplate/PageTemplate';

import { projects } from '../../consts/projects';
import { routePaths } from '../../utils/animationUtils';

const Technologies = () => {
    const nodes = [
        {
            key: 'react',
            title: 'React',
            image: "/assets/images/logos/react.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                null,
                'description line 2'
            ]
        },
        {
            key: 'nodejs',
            title: 'NodeJS',
            image: "/assets/images/logos/nodejs.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            key: 'express',
            title: 'Express',
            image: "/assets/images/logos/express.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            key: 'mongodb',
            title: 'MongoDB',
            image: "/assets/images/logos/mongo.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        }
    ];

    return (
        <PageTemplate nodes={nodes} swiperItems={projects} swiperFilterKey={"technologies"} swiperItemComponent={ProjectListItem} pagePath={routePaths.technologies} />
    );
}

export default Technologies;