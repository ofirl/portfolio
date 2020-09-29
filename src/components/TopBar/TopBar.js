import React, { useEffect, useMemo, useRef, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { Cell, Grid } from 'styled-css-grid';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    topBarGrid: {
        '&[class*="Grid"]': {
            height: '4em',
        },
    },
    pageIndicator: {
        transition: 'all 0.5s linear',
        position: 'absolute',
        height: '1px',
        backgroundColor: 'white',
        bottom: '1em',
        width: ({ indicatorWidth }) => indicatorWidth + "px",
        transform: ({ indicatorOffset }) => `translateX(${indicatorOffset}px)`,
    },
    topBarLink: {
        color: 'white',
    },
}));

const TopBar = () => {
    let [indicatorProps, setIndicatorProps] = useState({});
    let location = useLocation();

    let technologiesCellRef = useRef();
    let projectsCellRef = useRef();

    let classes = useStyles({ ...indicatorProps });

    const tabs = useMemo(() => ({
        '/technologies': technologiesCellRef,
        '/projects': projectsCellRef,
    }), []);

    useEffect(() => {
        let currentTab = tabs[location.pathname];
        if (!currentTab || !currentTab.current)
            return;

        setIndicatorProps({
            indicatorWidth: currentTab.current.offsetWidth,
            indicatorOffset: currentTab.current.offsetLeft
        });
    }, [location.pathname, tabs]);

    return (
        <Grid rows="1fr" columns="5em auto auto 1fr auto auto auto auto" areas={[". technologies projects . github linkedin mail resume"]} className={classes.topBarGrid}>
            <div className={classes.pageIndicator}>

            </div>
            <Cell ref={technologiesCellRef} area="technologies" className={clsx('vertical-align', classes.topBarLink)}>
                <Link to="/technologies">
                    <Typography variant="body2">
                        Technologies
                    </Typography>
                </Link>
            </Cell>
            <Cell ref={projectsCellRef} area="projects" className={clsx('vertical-align', classes.topBarLink)}>
                <Link to="/projects" className={classes.topBarLink}>
                    <Typography variant="body2">
                        Projects
                    </Typography>
                </Link>
            </Cell>
        </Grid>
    );
}

export default TopBar;