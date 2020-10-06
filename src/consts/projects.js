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
                    'ShopNDine is a map utility intended for "Hever" club members. The application’s vision is to create a better way to explore the club’s benefits.',
                    'It is a free web application that shows all the locations of businesses that collaborate with the “Hever” club and accept any kind of "Hever" card.'
                ]
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: 'ShopNDine was made for the purpose of making a convenient way to find relevant businesses with the help of a map view, filters, and the use of location services.',
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    'Due to changes in “Hever” club’s terms of use, which prohibit the existence of such applications, an email whitelist and a password was added to ShopNDine.',
                    'I encourage you to email me and ask for a password in order for you to see and to experience with the application.'
                ]
            },
            {
                type: 'Header',
                value: 'My Contribution'
            },
            {
                type: 'Text',
                value: `The application was made by me from scratch, based on my own vision as a member of "Hever" club.
                The idea, the design, the architecture of the database, the collection of the requirements were all my doing. 
                The visual design was made with Google Maps in mind for ease of use and a sense of familiarity.`
            },
            {
                type: 'Header',
                value: 'Interesting Features'
            },
            {
                type: 'Text',
                value: [
                    `The server is running cron jobs every week in order to update the database with new data. 
                    In each update, there is a consistency check for each location with OpenStreetMaps.`
                ],
            },
            {
                type: 'Text',
                value: [
                    'One of the requirements I set up for the application was its performance, particularly use as little bandwidth as possible.',
                    'I made the decision of saving the critical data - business name, location and other basic data - on the user’s device (using local storage), which made it easy to make the application a PWA (Progressive Web App).'
                ]
            },
            {
                type: 'Text',
                value: [
                    `In order to be efficient I also implemented delta updates.  
                    The application checks for an update every time it starts and if there is, the server extracts only the data that was changed since the last update check.`
                ]
            },
            // {
            //     type: 'List',
            //     // highlight: highlights.green,
            //     value: [
            //         'bullet1',
            //         'bullet2',
            //         'bullet3',
            //         'bullet4',
            //         'bullet5',
            //         'bullet6',
            //     ]
            // },
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