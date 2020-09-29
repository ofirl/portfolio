import React from 'react';

import { Link } from 'react-router-dom';

import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';

const useStyles = makeStyles(theme => ({
    landingContainer: {
        display: 'grid',
        position: 'relative',
        top: '15em',
        paddingRight: '3em',
        paddingLeft: '3em',
        zIndex: '5',
    },
    cardRoot: {
        borderRadius: '2em',
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
            <AnimatedBackground />
            <div className={classes.landingContainer}>
                <Card classes={cardClasses}>
                    <CardContent classes={cardContentClasses}>
                        <Typography variant="body2">
                            Hi,
                            <br />
                            I am Ofir
                            <br /><br />
                            Check it out :)
                            <Link to="/projects"> projects </Link>
                            <Link to="/technologies"> technologies </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default LandingPage;