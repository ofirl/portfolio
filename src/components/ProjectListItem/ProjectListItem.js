import React from 'react';

import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import { makeStyles, Typography } from '@material-ui/core';

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
    projectLogo: {
        height: '6em',
        width: '6em',
    },
    projectText: {
        textAlign: 'center',
    },
}));

const ProjectListItem = ({ title, description, technologies }) => {
    let classes = useStyles();

    return (
        <Grid rows="4fr 3fr" columns="1fr" className={classes.containerGrid}>
            <Cell className="horizontal-align vertical-align">
                <img src={`/assets/images/projects/${title}.png`} alt={`${title}-logo`} className={classes.projectLogo} />
            </Cell>
            <Cell className={clsx("horizontal-align", classes.projectText)}>
                <Grid columns="1fr" rows="auto 1fr">
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