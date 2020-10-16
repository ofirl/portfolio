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
                `I have the most as well as recent experience in React compared to other technology in my list. 
                I have created and architected web projects from scratch as well as jumped on ongoing projects.`,
                null,
                `I am familiar with recent techniques and libraries used in react like code-splitting, Hooks, React-Router, react-spring, css in js, etc.`,
            ]
        },
        {
            key: 'nodejs',
            title: 'NodeJS',
            image: "/assets/images/logos/nodejs.png",
            description: [
                'I am very experienced with NodeJS as i have used it for the backend in the majority of my projects.',
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