import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import { Route, Switch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useTransition, animated } from 'react-spring';
import { Cell, Grid } from 'styled-css-grid';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

import LandingPage from '../LandingPage/LandingPage';
import ProjectsPage from '../ProjectsPage/ProjectsPage';
import Technologies from '../Technologies/Technologies';
import TopBar from '../TopBar/TopBar';

const useStyles = makeStyles(theme => ({
    mainGrid: {
        '&[class*="Grid"]': {
            height: '100%',
        },
    },
    avatarContainer: {
        position: 'absolute',
        top: 'calc(50% - 11em)',
        zIndex: '10',
    },
    avatarInnerContainer: {
        position: 'relative',
    },
    avatarRoot: {
        width: '100%',
        height: '100%',
        textDecoration: 'none',
    },
}));

const RouteManager = () => {
    let location = useLocation();
    let prevLocation = useRef();

    let classes = useStyles();

    useEffect(() => {
        prevLocation.current = location.pathname
    }, [location]);

    // content transitions
    const contentTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { wait: 0, opacity: 0, position: 'absolute', left: '0em', top: '0em', height: '100%', width: '100%' };

            if (prevLocation.current === "/projects")
                return { wait: 0, opacity: 1, position: 'absolute', left: '20em', top: '0em', height: '100%', width: '100%' };
            if (prevLocation.current === "/technologies")
                return { wait: 0, opacity: 1, position: 'absolute', left: '-20em', top: '0em', height: '100%', width: '100%' };
        },
        enter: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return [{ wait: 1 }, { wait: 0, opacity: 1, position: 'absolute', left: '0em' }];

            return { wait: 0, opacity: 1, position: 'absolute', left: '0em' };
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { wait: 0, opacity: 0 };

            if (prevLocation.current === "/projects")
                return { wait: 0, opacity: 0, position: 'absolute', left: '-20em' };
            if (prevLocation.current === "/technologies")
                return { wait: 0, opacity: 0, position: 'absolute', left: '20em' };
        },
    });

    // content transitions
    const headerTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { opacity: 0, bottom: '1em', position: 'relative' };

            return { opacity: 1, bottom: '0em', position: 'relative' };
        },
        enter: item => {
            if (location.pathname === "/")
                return { opacity: 0, bottom: '1em', display: 'none' };

            return { opacity: 1, bottom: '0em' };
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { opacity: 0, bottom: '1em' };

            return { opacity: 1, bottom: '0em' };
        },
    });

    // avatar container transitions
    const avatarTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (!prevLocation.current) {
                if (location.pathname === "/")
                    return { top: '15em', right: '50%', width: '10em', height: '10em', padding: '0.5em 1.5em 0 0' };
                else
                    return { top: '0em', right: '0%', width: '3em', height: '3em', padding: '0em 0em 0 0' };
            }

            if (prevLocation.current === "/")
                return { top: '15em', right: '50%', width: '10em', height: '10em', padding: '0em 0em 0 0' };

            return { top: '0em', right: '0%', width: '3em', height: '3em', padding: '0.5em 1.5em 0 0' };
        },
        enter: item => {
            if (location.pathname === "/")
                return { top: '12.5em', right: '50%', width: '10em', height: '10em', padding: '0em 0em 0 0' };

            return { top: '0em', right: '0%', width: '3em', height: '3em', padding: '0.5em 1.5em 0 0' };
        },
        leave: item => {
            if (!prevLocation.current || prevLocation.current === "/")
                return { top: '12.5em', right: '50%', width: '10em', height: '10em', padding: '0em 0em 0 0' };

            return { top: '0em', right: '0%', width: '3em', height: '3em', padding: '0.5em 1.5em 0 0' };
        },
    });

    return (
        <Grid rows="2em 1fr" columns="1fr" className={classes.mainGrid}>
            <Route strict path="/">
                <AnimatedBackground />
            </Route>
            {
                avatarTransitions.map(({ item, props, key }) => {
                    let containerProps = {
                        top: props.top,
                        right: props.right,
                    };

                    let avatarProps = {
                        width: props.width,
                        height: props.height,
                        left: props.right,
                        padding: props.padding,
                    };

                    let avatar = (
                        <Avatar classes={{ root: classes.avatarRoot }}>
                            OL
                        </Avatar>
                    );
                    let avatarElement = location.pathname === "/" ? avatar : (
                        <Link to="/">
                            {avatar}
                        </Link>
                    );

                    return (
                        <animated.div key={key} className={classes.avatarContainer} style={containerProps}>
                            <animated.div className={classes.avatarInnerContainer} style={avatarProps}>
                                {avatarElement}
                            </animated.div>
                        </animated.div>
                    );
                })
            }
            <Cell>
                {
                    headerTransitions.map(({ item, props, key }) => (
                        <animated.div key={key} style={props}>
                            <TopBar />
                        </animated.div>
                    ))
                }
            </Cell>
            <Cell style={{ position: 'relative' }}>
                {
                    contentTransitions.map(({ item, props, key }) => (
                        <animated.div key={key} style={props}>
                            <Switch location={item}>
                                <Route path="/projects">
                                    <ProjectsPage />
                                </Route>
                                <Route path="/technologies">
                                    <Technologies />
                                </Route>
                                <Route strict path="/">
                                    <LandingPage />
                                </Route>
                            </Switch>
                        </animated.div>
                    ))
                }
            </Cell>
        </Grid>
    );
}

export default RouteManager;