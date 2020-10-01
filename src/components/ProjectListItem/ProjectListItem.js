import React from 'react';

import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import { makeStyles, Typography } from '@material-ui/core';

import useBreakpoint from '../../customHooks/useBreakPoint';

const useStyles = makeStyles(theme => ({
    containerGrid: {
        minWidth: '8em',
        width: 'calc(100% - 2em)',
        backgroundColor: 'white',
        borderRadius: '1em',
        '&[class*="Grid"]': {
            height: '100%',
        },
        paddingRight: '1em',
        paddingLeft: '1em',
    },
    projectLogo: {
        paddingTop: '1em',
        height: ({ breakpointHeight }) => breakpointHeight === 0 ? '4em' : '6em',
        width: ({ breakpointHeight }) => breakpointHeight === 0 ? '4em' : '6em',
    },
    projectTextCell: {
        display: 'grid',
        alignItems: 'end',
        textAlign: 'center',
    },
    projectTextGrid: {
        paddingBottom: '1em',
    },
}));

const ProjectListItem = ({ title, description, technologies }) => {
    let breakpoint = useBreakpoint("index");

    let classes = useStyles({ breakpointWidth: breakpoint.width, breakpointHeight: breakpoint.height });

    return (
        <Grid rows="auto 1fr" columns="1fr" className={classes.containerGrid}>
            <Cell className={clsx("horizontal-align", "vertical-align")}>
                <img src={`/assets/images/projects/${title}.png`} alt={`${title}-logo`} className={classes.projectLogo} />
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
    );
}

export default ProjectListItem;