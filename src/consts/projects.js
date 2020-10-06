const highlights = {
    green: '#52df583d',
};

export const projects = [
    {
        title: 'ShopNDine',
        timeline: 'Personal',
        technologies: ['MongoDB', 'Express', 'React', 'NodeJS'],
        description: [
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    'ShopNDine is a map utility for "Hever" that aims to bring the simplicity of a map view to the community.',
                    'It is a free web application that shows all the buisnesses that accept any kind of "Hever" cards on a map.'
                ]
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: 'The purpose of ShopNDine was to make it easier to find relevant businesses with the help of a map view, filters, and the use of location services.',
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    'It was put behind an email whitelist and password after "Hever" changed their terms of use to disallow such applications from existing, and remained in personal use only.',
                    'If you wish to see it and check it out email me and ask for a password (all passwords have an expiration date to prevent misuse).'
                ]
            },
            {
                type: 'Header',
                value: 'What I Did'
            },
            {
                type: 'Text',
                value: 'I designed the application from the ground up based on my own vision as a member of "Hever" (visual design was made to copy google maps for ease of use and sense of familiarity).'
            },
            {
                type: 'Header',
                value: 'Interesting Features'
            },
            {
                type: 'Text',
                value: [
                    `The server is running cron jobs to update the database with new data every week since update takes about 3 hours, 
                    i'm checking each location data for consistency with OpenStreetMaps.`
                ],
            },
            {
                type: 'Text',
                value: [
                    'One of my requirments was for the application to be performant and use as little bandwith as possible.',
                    'I made the decision of saving the critical data (business name, location and other basic data) on the users device (using local storage), this made the way to make the application a PWA (Progressive Web App) very easy.'
                ]
            },
            {
                type: 'Text',
                value: [
                    `In order to be efficient i also implemented delta updates, 
                    The application checks for an update every time it starts and if its available the server brings only the data that was changed since the last update.`
                ]
            },
            {
                type: 'List',
                // highlight: highlights.green,
                value: [
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                ]
            },
            {
                type: 'List',
                // highlight: highlights.green,
                value: [
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                ]
            },
            {
                type: 'List',
                // highlight: highlights.green,
                value: [
                    'bullet1',
                    'bullet2',
                    'bullet3',
                    'bullet4',
                    'bullet5',
                    'bullet6',
                ]
            },
        ],
    },
    {
        title: 'Timefy',
        timeline: 'Personal',
        technologies: ['MongoDB', 'Express', 'React', 'NodeJS'],
        description: [],
    },
    {
        title: 'Management Portal',
        timeline: 'Navy',
        technologies: ['IIS', 'React'],
        description: [],
    },
    {
        title: 'Gantt',
        timeline: 'Navy',
        technologies: ['React'],
        description: [],
    },
];