import React from 'react';

import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import { makeStyles, Typography } from '@material-ui/core';

import useBreakpoint from '../../customHooks/useBreakPoint';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    containerGrid: {
        backgroundColor: 'white',
        borderRadius: '1em',
        '&[class*="Grid"]': {
            height: '100%',
        },
        paddingRight: '1em',
        paddingLeft: '1em',
    },
    projectImageCell: {
        display: 'grid',
        alignItems: 'end',
    },
    projectLogo: {
        paddingTop: '1em',
        height: ({ breakpointHeight }) => breakpointHeight === 0 ? '4em' : '6em',
        width: ({ breakpointHeight }) => breakpointHeight === 0 ? '4em' : '6em',
    },
    projectTextCell: {
        display: 'grid',
        alignItems: 'center',
        textAlign: 'center',
    },
    projectTextGrid: {
        paddingBottom: '1em',
    },
}));

const ProjectListItem = ({ project, closeRedirect }) => {
    let { key, title, technologies } = project;
    let breakpoint = useBreakpoint("index");

    let classes = useStyles({ breakpointWidth: breakpoint.width, breakpointHeight: breakpoint.height });

    return (
        <>
            <Link to={`${closeRedirect}/project/${project.key}`}>
                <Grid rows="1fr 1fr" columns="1fr" className={classes.containerGrid}>
                    <Cell className={clsx("horizontal-align", classes.projectImageCell)}>
                        <img src={`/assets/images/projects/${key}/logo.png`} alt={`${key}-logo`} className={classes.projectLogo} />
                    </Cell>
                    <Cell className={clsx("horizontal-align", classes.projectTextCell)}>
                        <Grid columns="1fr" rows="auto 1fr" className={classes.projectTextGrid}>
                            <Typography variant="h6">
                                {title}
                            </Typography>
                            <Typography variant="caption">
                                {technologies.join(' | ')}
                            </Typography>
                        </Grid>
                    </Cell>
                </Grid> 
            </Link>
            <Router>
                <Route path={`/:tab?/:node?/project/${project.key}`}>
                    <ProjectDetails project={project} closeRedirect={closeRedirect} />
                </Route>
            </Router>
        </>
    );
}

export default ProjectListItem;