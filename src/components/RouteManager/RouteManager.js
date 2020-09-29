import { Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import { Route, Switch, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useTransition, animated } from 'react-spring';
import { Cell, Grid } from 'styled-css-grid';
import { animationSpringConfig } from '../../utils/animationUtils';

import LandingPage from '../LandingPage/LandingPage';
import ProjectsPage from '../ProjectsPage/ProjectsPage';
import Technologies from '../Technologies/Technologies';
import TopBar from '../TopBar/TopBar';
import BackgroundManager from './components/BackgroundManager/BackgroundManager';

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
    contentContainer: {
        height: '100%',
        width: '100%',
    },
}));

const RouteManager = () => {
    let location = useLocation();
    let prevLocation = useRef();

    let classes = useStyles();

    let [headerItems, setHeaderItems] = useState(location);

    useEffect(() => {
        if (location.pathname === "/" || prevLocation.current === "/")
            setHeaderItems(location);

        setTimeout(() => {
            prevLocation.current = location.pathname
        }, 100);
    }, [location]);

    // content transitions
    const contentTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { wait: 0, opacity: 0, position: 'absolute', left: '0em', top: '0em' };

            if (prevLocation.current === "/projects")
                return { wait: 0, opacity: 1, position: 'absolute', left: '20em', top: '0em' };
            if (prevLocation.current === "/technologies")
                return { wait: 0, opacity: 1, position: 'absolute', left: '-20em', top: '0em' };
        },
        enter: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return [{ wait: 1, config: animationSpringConfig }, { wait: 0, opacity: 1, position: 'absolute', left: '0em' }];

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
        config: animationSpringConfig,
    });

    // header transitions
    const headerTransitions = useTransition(headerItems, location => location.pathname, {
        from: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { wait: 0, opacity: 0, bottom: '1em', position: 'relative' };

            return { wait: 0, opacity: 1, bottom: '0em', position: 'relative' };
        },
        enter: item => {
            if (location.pathname === "/")
                return { wait: 0, opacity: 0, bottom: '1em', display: 'none' };

            return [{ wait: 1 }, { wait: 0, opacity: 1, bottom: '0em' }];
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { wait: 0, opacity: 0, bottom: '1em' };

            return { wait: 0, opacity: 1, bottom: '0em' };
        },
        config: animationSpringConfig,
    });

    // avatar transitions
    const avatarTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (!prevLocation.current) {
                if (location.pathname === "/")
                    return { wait: 0, top: '20em', left: '50%', width: '10em', height: '10em', padding: '0em 0em 0em 0em' };
                else
                    return { wait: 0, top: '0em', left: '0%', width: '3em', height: '3em', padding: '0.5em 0em 0em 1.5em' };
            }

            if (prevLocation.current === "/")
                return { wait: 0, top: '13.5em', left: '50%', width: '10em', height: '10em', padding: '0em 0em 0em 0em' };

            return { wait: 0, top: '0em', left: '0%', width: '3em', height: '3em', padding: '0.5em 0em 0em 1.5em' };
        },
        enter: item => {
            if (location.pathname === "/")
                return { wait: 0, top: '13.5em', left: '50%', width: '10em', height: '10em', padding: '0em 0em 0em 0em' };

            if (!prevLocation.current)
                return { wait: 0, top: '0em', left: '0%', width: '3em', height: '3em', padding: '0.5em 0em 0em 1.5em' };

            return [{ wait: 1 }, { wait: 0, top: '0em', left: '0%', width: '3em', height: '3em', padding: '0.5em 0em 0em 1.5em' }];
        },
        leave: item => {
            if (!prevLocation.current || prevLocation.current === "/")
                return { wait: 0, top: '13.5em', left: '50%', width: '10em', height: '10em', padding: '0em 0em 0em 0em' };

            return { wait: 0, top: '0em', left: '0%', width: '3em', height: '3em', padding: '0.5em 0em 0em 1.5em' };
        },
        config: animationSpringConfig,
    });

    return (
        <Grid gap="0" rows='4em 1fr' columns="1fr" className={classes.mainGrid}>
            <BackgroundManager prevLocation={prevLocation} location={location} />
            {
                avatarTransitions.map(({ item, props, key }) => {
                    let containerProps = {
                        top: props.top,
                        left: props.left,
                    };

                    let avatarProps = {
                        width: props.width,
                        height: props.height,
                        right: props.left,
                        padding: props.padding,
                    };

                    let avatar = (
                        <Avatar src="/assets/images/profile.png" classes={{ root: classes.avatarRoot }}>
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
                    headerTransitions.map(({ item, props, key }) => {
                        return (
                            <animated.div key={key} style={props}>
                                <TopBar />
                            </animated.div>
                        )
                    })
                }
            </Cell>
            <Cell style={{ position: 'relative' }}>
                {
                    contentTransitions.map(({ item, props, key }) => (
                        <animated.div key={key} className={classes.contentContainer} style={props}>
                            <Switch location={item}>
                                <Route path="/projects">
                                    <ProjectsPage />
                                </Route>
                                <Route path="/technologies">
                                    <Technologies />
                                </Route>
                                <Route exact path="/">
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