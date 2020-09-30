import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { animated, useTransition } from 'react-spring';

import { animationSpringConfig } from '../../../../utils/animationUtils';

import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';

const useStyles = makeStyles(theme => ({
    backgroundDiv: {
        position: 'absolute',
        zIndex: '-1',
        top: '0em',
        height: '100%',
        width: '100%',
        backgroundImage: 'url("/assets/images/background-doodle-tech.png")',
        backgroundSize: 'contain',
        '&:after': {
            content: "''",
            background: '#333333e6',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
        },
    },
}));

const paths = {
    landingPage: '/',
    technologies: '/technologies',
    projects: '/projects',
};

const BackgroundManager = ({ prevLocation, location }) => {
    let prevPath = prevLocation.current;
    let currPath = location.pathname;

    let [landingPageBackground, setLandingPageBackground] = useState(location.pathname === "/" ? location : null);
    let [technologiesBackground, setTechnologiesBackground] = useState(location.pathname === paths.technologies ? location : null);

    let classes = useStyles();

    useEffect(() => {
        // landing page
        if (location.pathname === "/")
            setLandingPageBackground(location);
        else
            setLandingPageBackground(null);

        // technologies
        if (location.pathname === paths.technologies)
            setTechnologiesBackground(location);
        else
            setTechnologiesBackground(null);
    }, [location]);

    // landing page
    const landingPageBackgroundTransitions = useTransition(landingPageBackground, null, {
        from: item => {
            if (prevLocation.current === "/")
                return { wait: 0, opacity: 1 };

            return { wait: 0, opacity: 0, display: 'none' };
        },
        enter: item => {
            if (location.pathname === "/")
                return [{ wait: 1, display: 'block' }, { wait: 0, opacity: 1 }];

            return { wait: 0, opacity: 0, display: 'none' };
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current !== "/")
                return { opacity: 0, display: 'none' };

            return { opacity: 1, display: 'none'};
        },
        config: animationSpringConfig,
    });

    // technologies
    const technologiesBackgroundTransitions = useTransition(technologiesBackground, null, {
        from: item => {
            if (!prevPath)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === paths.technologies) {
                if (prevPath === paths.projects)
                    return { wait: 0, opacity: 0, left: '-20em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        enter: item => {
            if (currPath === paths.technologies) {
                if (prevPath === paths.landingPage)
                    return [{ wait: 1 }, { wait: 0, opacity: 1, left: '0em' }];

                return { wait: 0, opacity: 1, left: '0em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        leave: item => {
            if (currPath === paths.landingPage)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === paths.projects)
                return { wait: 0, opacity: 0, left: '-20em' };

            return { wait: 0, opacity: 0 };
        },
        config: animationSpringConfig,
    });

    return (
        <>
            {
                landingPageBackgroundTransitions.map(({ item, props, key }) => (
                    <AnimatedBackground key={key} animatedStyle={props} />
                ))
            }
            {
                technologiesBackgroundTransitions.map(({ item, props, key }) => (
                    <animated.div key={key} className={classes.backgroundDiv} style={props} />
                ))
            }
        </>
    );
}

export default BackgroundManager;