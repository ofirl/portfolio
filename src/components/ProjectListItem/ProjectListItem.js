import React from 'react';

import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import { makeStyles, Typography } from '@material-ui/core';

import useBreakpoint from '../../customHooks/useBreakPoint';

const useStyles = makeStyles(theme => ({
    containerGrid: {
        width: ({ breakpointWidth }) => breakpointWidth > 1 ? '10em' : '8em',
        // minWidth: '8em',
        // width: 'calc(100% - 2em)',
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

const ProjectListItem = ({ title, description, technologies }) => {
    let breakpoint = useBreakpoint("index");

    let classes = useStyles({ breakpointWidth: breakpoint.width, breakpointHeight: breakpoint.height });

    return (
        <Grid rows="1fr 1fr" columns="1fr" className={classes.containerGrid}>
            <Cell className={clsx("horizontal-align", classes.projectImageCell)}>
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