const highlights = {
    green: '#52df583d',
};

export const projects = [
    {
        key: 'shopndine',
        url: {
            type: 'Site',
            url: 'https://shopndine.ofirl.com',
        },
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
            {
                type: 'Text',
                value: [
                    `Moreover, I installed Matomo and implemented it across the site. 
                    With the help of this tool, I was able to monitor the common statistics, such as CTR (Click Through Rate), 
                    and also to monitor the business related actions the users did. 
                    The data that is being collected can be filtered by the day, week, location, device type and all the other available metrics. 
                    Using those statistics led me to interesting insights such as what is the average distance people are searching in, what business is the most popular, 
                    the call/opened in google maps rate etc. 
                    `
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
            {
                type: 'Gallery',
                direction: 'rows',
                size: 2,
                value: [
                    {
                        src: 'desktop_contact_form.png',
                        width: 2,
                        caption: 'Desktop Cotact Form'
                    },
                    {
                        src: 'desktop_landing.png',
                        width: 2,
                        caption: 'Desktop Landing Page'
                    },
                    {
                        src: 'desktop_selected_details.png',
                        width: 2,
                        caption: 'Desktop Selected Details'
                    },
                    {
                        src: 'mobile_about.png',
                        height: 2,
                        caption: 'Mobile About'
                    },
                    {
                        src: 'mobile_filter.png',
                        height: 2,
                        caption: 'Mobile Filter'
                    },
                    {
                        src: 'mobile_landing.png',
                        height: 2,
                        caption: 'Mobile Landing Page'
                    },
                    {
                        src: 'mobile_layer_picker.png',
                        height: 2,
                        caption: 'Mobile Layer Picker'
                    },
                    {
                        src: 'mobile_menu.png',
                        height: 2,
                        caption: 'Mobile Menu'
                    },
                    {
                        src: 'mobile_select.png',
                        height: 2,
                        caption: 'Mobile Selcted'
                    },
                    {
                        src: 'mobile_selected_details.png',
                        height: 2,
                        caption: 'Mobile Selcted Details'
                    },
                    {
                        src: 'mobile_selected_minimized.png',
                        height: 2,
                        caption: 'Mobile Selected Minimized'
                    },
                ]
            }
        ],
    },
    {
        key: 'managementportal',
        url: {
            type: 'Demo',
            url: 'https://management-portal.ofirl.com',
        },
        title: 'Management Portal',
        timeline: 'Navy',
        technologies: ['IIS', 'React'],
        description: [
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    `ManagementPortal is an application whose purpose is making repetitive tasks easier for me and for my development team through automation.`,
                ]
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    `There are certain actions that my team and I perform on a daily basis such as adding users to our system. 
                    Each action does not take a lot of time in itself, but when there is a need to repeat those actions for a large number of times, 
                    it takes a considerable amount of our time, hence the reason this portal was created.
                    `
                ]
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: `This application was the first React application I developed.`,
            },
            {
                type: 'Header',
                value: `My Contribution`,
            },
            {
                type: 'Text',
                value: [
                    `I am the one who came up with the idea after spotting the need for an application like this to save time for me and my team. 
                    I designed the application and provided ideas for all the various scripts that can be found in the portal which later on, I also wrote.
                    `
                ],
            },
            {
                type: 'Text',
                value: [
                    `At first, I made a quick POC (Proof Of Concept) using static HTML/CSS with Bootstrap and presented it to my team.`,
                    `Later, I developed it in React and implemented it on our servers and systems.`,
                ],
            },
            {
                type: 'Header',
                value: `Interesting Features`
            },
            {
                type: 'Text',
                value: `I implemented a user system, in order to prevent unauthorized use of this portal.`,
            },
            {
                type: 'Text',
                value: [
                    `There is a  history section, in order to see who ran a certain script, at what time the user ran it and what parameters did they use to run the script with. 
                    This feature helped us tremendously in various situations.
                    `
                ]
            },
            {
                type: 'Header',
                value: `Unique Challenges`
            },
            {
                type: 'Text',
                value: [
                    `The first obstacle was that my automation scripts had to interface with SAP due to the fact that my team is in charge of SAP systems.`,
                    `After researching the subject, I decided to record basic VBS scripts (Visual Basic Script) using SAP built-in tools 
                    and convert them to JavaScript to be used in the portal.`,
                    `This method saved me time on writing the scripts since the built-in tools could record everything 
                    and the conversion between VBS and JavaScript is basically just different syntax so it was easy to convert and start adding whatever I needed.`
                ]
            },
            {
                type: 'Text',
                value: [
                    `My second challenge was to connect to SAP Logon, the desktop application we were using, through the browser. 
                    I realized that the portal should be opened in chrome since the version of InternetExplorer in our computers was an old version.`,
                    `The solution I came up with was to open a generated link with IE which was done using registry magic, 
                    meaning links that would start with the prefix that I chose would run a command that opened those links in IE 
                    in order to get a ActiveX support (which chrome doesn’t have) and connect to SAP through the ROT (Running Object Table).
                    `
                ]
            },
            {
                type: 'Gallery',
                direction: 'rows',
                size: 2,
                value: [
                    {
                        src: 'login.png',
                        width: 2,
                        caption: 'Login'
                    },
                    {
                        src: 'homepage.png',
                        width: 2,
                        caption: 'Homepage'
                    },
                    {
                        src: 'script-input.png',
                        width: 2,
                        caption: 'Script Input'
                    },
                    {
                        src: 'script-input-advanced-filter.png',
                        width: 2,
                        caption: 'Script Input Advanced Filter'
                    },
                    {
                        src: 'profile-menu.png',
                        width: 2,
                        caption: 'Profile Menu'
                    },
                    {
                        src: 'profile-page.png',
                        width: 2,
                        caption: 'Profile Page'
                    },
                    {
                        src: 'edit-profile-1.png',
                        width: 2,
                        caption: 'Edit Profile 1'
                    },
                    {
                        src: 'edit-profile-2.png',
                        width: 2,
                        caption: 'Edit Profile 2'
                    },
                    {
                        src: 'history.png',
                        width: 2,
                        caption: 'History Page'
                    },
                    {
                        src: 'history-advanced-filter.png',
                        width: 2,
                        caption: 'History Page Advanced Filter'
                    },
                    {
                        src: 'history-item.png',
                        width: 2,
                        caption: 'History Item'
                    },
                    {
                        src: 'history-item-advanced-filter.png',
                        width: 2,
                        caption: 'History Item Advanced Filter'
                    },
                ]
            }
        ],
    },
    {
        key: 'gantt',
        title: 'Gantt',
        timeline: 'Navy',
        technologies: ['React'],
        description: [],
    },
    {
        key: 'vikinger',
        title: 'Vikinger',
        timeline: 'Personal',
        url: {
            type: 'Site',
            url: 'https://badger.ofirl.com',
        },
        technologies: ['MongoDB', 'Express', 'React', 'NodeJS'],
        description: [
            {
                type: 'Text',
                highlight: highlights.green,
                value: [
                    `Vikinger started out as a TypeScript project and quickly escalated to a full social network with groups, accounts badges, events and much more`,
                ]
            },
            {
                type: 'Text',
                highlight: highlights.green,
                value: `This application is built entirely in TypeScript, front-end and back-end.`,
            },
            {
                type: 'Header',
                value: `My Contribution`,
            },
            {
                type: 'Text',
                value: [
                    `The application is built by me from scratch, the design is heavily inspired from things i saw and liked on Dribbble.
                    `
                ],
            },
            {
                type: 'Header',
                value: 'Interesting Features'
            },
            {
                type: 'Text',
                value: [
                    `I implemented an account system so that anyone can write something about themselves if they want.
                    This comes with a profile page and with a little bit of customization (cover image, etc.) for your own style.
                    `
                ],
            },
            {
                type: 'Text',
                value: [
                    `I implemented a management system so that admins will have full control over everything and maintainers will have less control,
                    allowing the admins to get help in managing the site and supervising it.
                    `
                ],
            },
            {
                type: 'Text',
                value: [
                    `Each account can get badges based on things they do (post a certain amount of stuff,  gets reaction on their posts, etc.),
                    admins and maintainers can manage the badges on any account.
                    `
                ],
            },
            {
                type: 'Text',
                value: [
                    `Groups can be public or private and open to everyone or by invitation only, groups can also have group admins and group maintainers.
                    Groups have their own discussion page.
                    `
                ],
            },
            {
                type: 'Gallery',
                direction: 'rows',
                size: 2,
                value: [
                    {
                        src: 'login.png',
                        width: 2,
                        caption: 'Login',
                    },
                    {
                        src: 'accountHubGroupInvitations.png',
                        width: 2,
                        caption: 'Group Invitations',
                    },
                    {
                        src: 'badgesSmallScreen.png',
                        height: 2,
                        caption: 'Badges',
                    },
                    {
                        src: 'accountHubManageGroups.png',
                        width: 2,
                        caption: 'Manage Groups',
                    },
                    {
                        src: 'accountProfileSmallScreen.png',
                        height: 2,
                        caption: 'Account Profile',
                    },
                    {
                        src: 'accountHubNotifications.png',
                        width: 2,
                        caption: 'Account Hub Notifications',
                    },
                    {
                        src: 'accountSmallScreen.png',
                        height: 2,
                        caption: 'Accounts',
                    },
                    {
                        src: 'accounts.png',
                        width: 2,
                        caption: 'Account',
                    },
                    {
                        src: 'searchBarSmallScreen.png',
                        height: 2,
                        caption: 'Search Bar',
                    },
                    {
                        src: 'accoutnHubProfileInfo.png',
                        width: 2,
                        caption: 'Account Hub Profile',
                    },
                    {
                        src: 'newsfeedSmallScreen.png',
                        height: 2,
                        caption: 'Newsfeed',
                    },
                    {
                        src: 'accoutnHubProfileInfo2.png',
                        width: 2,
                        caption: 'Account Hub Profile 2',
                    },
                    {
                        src: 'menuSmallScreen.png',
                        height: 2,
                        caption: 'Menu',
                    },
                    {
                        src: 'badges.png',
                        width: 2,
                        caption: 'Badges',
                    },
                    {
                        src: 'groupDiscussion.png',
                        width: 2,
                        caption: 'Group Discussion',
                    },
                    {
                        src: 'groupMembers.png',
                        width: 2,
                        caption: 'Group Members',
                    },
                    {
                        src: 'groupProfile.png',
                        width: 2,
                        caption: 'Group Profile',
                    },
                    {
                        src: 'groups.png',
                        width: 2,
                        caption: 'Groups',
                    },
                    {
                        src: 'manageGroupInfo.png',
                        width: 2,
                        caption: 'Manage Group info',
                    },
                    {
                        src: 'manageGroupMembers.png',
                        width: 2,
                        caption: 'Manage Groupo Members',
                    },
                    {
                        src: 'manageGroupSettings.png',
                        width: 2,
                        caption: 'Manage Group Settings',
                    },
                    {
                        src: 'newsfeed.png',
                        width: 2,
                        caption: 'Newsfeed',
                    },
                    {
                        src: 'notificationsWindow.png',
                        width: 2,
                        caption: 'Notifications Window',
                    },
                    {
                        src: 'profileAbout.png',
                        width: 2,
                        caption: 'Account Profile About',
                    },
                    {
                        src: 'profileBadges.png',
                        width: 2,
                        caption: 'Account Profile Badges',
                    },
                    {
                        src: 'profileBadgesManage.png',
                        width: 2,
                        caption: 'Account Badge Management',
                    },
                    {
                        src: 'quests.png',
                        width: 2,
                        caption: 'Quests',
                    },
                    {
                        src: 'searchBar.png',
                        width: 2,
                        caption: 'Search Bar',
                    },
                    {
                        src: 'settingsMenu.png',
                        width: 2,
                        caption: 'Settings Menu',
                    },
                ]
            }
        ],
    },
];