import React, { useContext, useEffect, useMemo, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { animated, useTransition } from 'react-spring';

import { animationSpringConfig, routePaths } from '../../../../utils/animationUtils';

import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';

import { backgroundDataContext } from '../../../../context/backgroundDataContext';
import { Cell, Grid } from 'styled-css-grid';

const useStyles = makeStyles(theme => ({
    fullScreenBackground: {
        position: 'absolute',
        zIndex: '-1',
        top: '0em',
        height: '100%',
        width: '100%',
    },
    backgroundDiv: {
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
    timelineBackgroundImagesGrid: {
        transition: 'all 0.5s ease-in-out',
        '&[class*="Grid"]': {
            height: '100%',
        },
    },
    timelineBackgroundImage: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'opacity(0.3)',
    },
}));

const baseImagesUrl = '/assets/images/'
const timelineImages = [
    {
        title: 'Navy',
        image: baseImagesUrl + 'navy-background-Small.jpg',
        selected: true,
    },
    {
        title: 'Personal',
        image: baseImagesUrl + 'personalProjects-background-Small.jpg',
    },
];

const BackgroundManager = ({ prevLocation, location }) => {
    let prevPath = prevLocation.current;
    let currPath = location.pathname;

    let [landingPageBackground, setLandingPageBackground] = useState(currPath === "/" ? location : null);
    let [technologiesBackground, setTechnologiesBackground] = useState(currPath === routePaths.technologies ? location : null);
    let [timelineBackground, setTimelineBackground] = useState(currPath === routePaths.timeline ? location : null);
    let [currentTimelineImages, setCurrentTimelineImages] = useState(timelineImages);

    let { data: backgroundData } = useContext(backgroundDataContext);

    let classes = useStyles();

    let timelineImageCells = useMemo(() =>
        currentTimelineImages.map((i, idx) =>
            <Cell key={idx} className={clsx(classes.timelineBackgroundImage)} style={{ backgroundImage: `url(${i.image})` }} />
        ), [currentTimelineImages, classes.timelineBackgroundImage]);

    useEffect(() => {
        // landing page
        if (location.pathname === routePaths.landingPage)
            setLandingPageBackground(location);
        else
            setLandingPageBackground(null);

        // technologies
        if (location.pathname === routePaths.technologies)
            setTechnologiesBackground(location);
        else
            setTechnologiesBackground(null);

        // timeline
        if (location.pathname === routePaths.timeline)
            setTimelineBackground(location);
        else
            setTimelineBackground(null);
    }, [location]);

    useEffect(() => {
        if (!backgroundData || backgroundData.currentNodeIdx == null)
            return;

        let updatedImages = timelineImages.map(i => ({
            ...i,
            selected: false,
            key: Math.random(),
        }))

        updatedImages[backgroundData.currentNodeIdx] = { ...updatedImages[backgroundData.currentNodeIdx], selected: true };

        setCurrentTimelineImages(updatedImages);
    }, [backgroundData])

    let timelineImagesGridLayout = useMemo(() => {
        let baseValue = 50 / currentTimelineImages.length;
        return currentTimelineImages.map(i => i.selected ? baseValue + 50 : baseValue).map(p => p + "%").join(' ');
    }, [currentTimelineImages]);

    // landing page
    const landingPageBackgroundTransitions = useTransition(landingPageBackground, null, {
        from: item => {
            if (prevLocation.current === routePaths.landingPage)
                return { wait: 0, opacity: 1 };

            return { wait: 0, opacity: 0, display: 'none' };
        },
        enter: item => {
            if (currPath === routePaths.landingPage)
                return [{ wait: 1, display: 'block' }, { wait: 0, opacity: 1 }];

            return { wait: 0, opacity: 0, display: 'none' };
        },
        leave: item => {
            if (currPath === routePaths.landingPage || prevLocation.current !== routePaths.landingPage)
                return { opacity: 0, display: 'none' };

            return { opacity: 1, display: 'none' };
        },
        config: animationSpringConfig,
    });

    // technologies
    const technologiesBackgroundTransitions = useTransition(technologiesBackground, null, {
        from: item => {
            if (!prevPath)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === routePaths.technologies) {
                if (prevPath === routePaths.timeline)
                    return { wait: 0, opacity: 0, left: '-20em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        enter: item => {
            if (currPath === routePaths.technologies) {
                if (prevPath === routePaths.landingPage)
                    return [{ wait: 1 }, { wait: 0, opacity: 1, left: '0em' }];

                return { wait: 0, opacity: 1, left: '0em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        leave: item => {
            if (currPath === routePaths.landingPage)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === routePaths.timeline)
                return { wait: 0, opacity: 0, left: '-20em' };

            return { wait: 0, opacity: 0 };
        },
        config: animationSpringConfig,
    });

    // timeline
    const timelineBackgroundTransitions = useTransition(timelineBackground, null, {
        from: item => {
            if (!prevPath)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === routePaths.timeline) {
                if (prevPath === routePaths.technologies)
                    return { wait: 0, opacity: 0, left: '20em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        enter: item => {
            if (currPath === routePaths.timeline) {
                if (prevPath === routePaths.landingPage)
                    return [{ wait: 1 }, { wait: 0, opacity: 1, left: '0em' }];

                return { wait: 0, opacity: 1, left: '0em' };
            }

            return { wait: 0, opacity: 0, left: '0em' };
        },
        leave: item => {
            if (currPath === routePaths.landingPage)
                return { wait: 0, opacity: 0, left: '0em' };

            if (currPath === routePaths.technologies)
                return { wait: 0, opacity: 0, left: '20em' };

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
                    <animated.div key={key} className={clsx(classes.backgroundDiv, classes.fullScreenBackground)} style={props} />
                ))
            }
            {
                timelineBackgroundTransitions.map(({ item, props, key }) => (
                    <animated.div key={key} className={clsx(classes.fullScreenBackground)} style={props}>
                        <Grid gap="0" columns="1fr" rows={timelineImagesGridLayout} className={classes.timelineBackgroundImagesGrid}>
                            {
                                timelineImageCells
                            }
                        </Grid>
                    </animated.div>
                ))
            }
        </>
    );
}

export default BackgroundManager;