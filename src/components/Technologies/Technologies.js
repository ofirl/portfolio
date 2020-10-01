import React from 'react';

import ProjectListItem from '../ProjectListItem/ProjectListItem';
import PageTemplate from '../PageTemplate/PageTemplate';

import { projects } from '../../utils/projects';

const Technologies = () => {
    const nodes = [
        {
            title: 'React',
            image: "/assets/images/logos/react.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                null,
                'description line 2'
            ]
        },
        {
            title: 'NodeJS',
            image: "/assets/images/logos/nodejs.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            title: 'Express',
            image: "/assets/images/logos/express.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            title: 'MongoDB',
            image: "/assets/images/logos/mongo.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        }
    ];

    return (
        <PageTemplate nodes={nodes} swiperItems={projects} swiperFilterKey={"technologies"} swiperItemComponent={ProjectListItem} />
    );
}

export default Technologies;