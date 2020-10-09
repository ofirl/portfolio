import React, { useEffect, useMemo, useRef, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { Cell, Grid } from 'styled-css-grid';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { routePaths } from '../../utils/animationUtils';

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

const TopBarLink = ({ pathname, to, title }) => {
    const typographyElement = (
        <Typography variant="body2">
            {title}
        </Typography>
    );

    return pathname.startsWith(to) ?
        typographyElement
        :
        <Link to={to}>
            {typographyElement}
        </Link>
}

const TopBar = () => {
    let [indicatorProps, setIndicatorProps] = useState({});
    let { pathname } = useLocation();

    let technologiesCellRef = useRef();
    let projectsCellRef = useRef();

    let classes = useStyles({ ...indicatorProps });

    const tabs = useMemo(() => ([
        {
            path: routePaths.technologies,
            ref: technologiesCellRef,
        },
        {
            path: routePaths.timeline,
            ref: projectsCellRef,
        }
    ]), []);

    useEffect(() => {
        let currentTab = tabs.find(t => pathname.startsWith(t.path));
        if (!currentTab || !currentTab.ref.current)
            return;

        currentTab = currentTab.ref;

        setIndicatorProps({
            indicatorWidth: currentTab.current.offsetWidth,
            indicatorOffset: currentTab.current.offsetLeft
        });
    }, [pathname, tabs]);

    return (
        <Grid gap="1em" rows="1fr" columns="5em auto auto 1fr auto auto auto auto" areas={[". technologies projects . github linkedin mail resume"]} className={classes.topBarGrid}>
            <div className={classes.pageIndicator} />
            <Cell ref={technologiesCellRef} area="technologies" className={clsx('vertical-align', classes.topBarLink)}>
                <TopBarLink pathname={pathname} title="Technologies" to={routePaths.technologies} />
            </Cell>
            <Cell ref={projectsCellRef} area="projects" className={clsx('vertical-align', classes.topBarLink)}>
                <TopBarLink pathname={pathname} title="Timeline" to={routePaths.timeline} />
            </Cell>
        </Grid>
    );
}

export default TopBar;