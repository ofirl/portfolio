import React from 'react';

import { Link } from 'react-router-dom';

import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

const useStyles = makeStyles(theme => ({
    landingContainer: {
        display: 'grid',
        position: 'relative',
        top: '15em',
        // paddingRight: '3em',
        // paddingLeft: '3em',
        zIndex: '5',
    },
    cardRoot: {
        // borderRadius: '2em',
        background: '#ffffffde',
    },
    cardContentRoot: {
        textAlign: 'center',
        paddingTop: '7em',
    }
}));

const LandingPage = () => {
    let classes = useStyles();

    let cardClasses = {
        root: classes.cardRoot,
    };

    let cardContentClasses = {
        root: classes.cardContentRoot,
    };

    return (
        <>
            {/* <AnimatedBackground /> */}
            <div className={classes.landingContainer}>
                <Card classes={cardClasses}>
                    <CardContent classes={cardContentClasses}>
                        <Typography variant="body2">
                            Hi,
                            <br />
                            I am Ofir Levi, A Software Developer with 4+ years of Software Development experience on various Platforms, Passionate to build Polished, Innovative and well-detailed Apps with Fluid Animations to complement the Design.
                            <br /><br />
                            Checkout my
                            <Link to="/projects"> Projects </Link>
                            and
                            <Link to="/technologies"> Technologies </Link>
                            that I worked on.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default LandingPage;