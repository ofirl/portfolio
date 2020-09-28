import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import { Route, Switch, useLocation } from 'react-router';

import { useTransition, animated } from 'react-spring';
import { Cell, Grid } from 'styled-css-grid';

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
                return { opacity: 0, position: 'absolute', left: '0em', top: '0em', height: '100%', width: '100%' };

            if (prevLocation.current === "/projects")
                return { opacity: 1, position: 'absolute', left: '20em', top: '0em', height: '100%', width: '100%' };
            if (prevLocation.current === "/technologies")
                return { opacity: 1, position: 'absolute', left: '-20em', top: '0em', height: '100%', width: '100%' };
        },
        enter: item => {
            return { opacity: 1, position: 'absolute', left: '0em' };
        },
        leave: item => {
            console.log(prevLocation.current)
            if (location.pathname === "/" || prevLocation.current === "/")
                return { opacity: 0 };

            if (prevLocation.current === "/projects")
                return { opacity: 0, position: 'absolute', left: '-20em' };
            if (prevLocation.current === "/technologies")
                return { opacity: 0, position: 'absolute', left: '20em' };
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
                return { opacity: 0, bottom: '1em' };

            return { opacity: 1, bottom: '0em' };
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current === "/")
                return { opacity: 0, bottom: '1em' };

            return { opacity: 1, bottom: '0em' };
        },
    });

    return (
        <Grid rows="2em 1fr" columns="1fr" className={classes.mainGrid}>
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