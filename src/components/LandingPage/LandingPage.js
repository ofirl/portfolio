import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { animated, useTransition } from 'react-spring';

import { animationSpringConfig } from '../../utils/animationUtils';

const useStyles = makeStyles(theme => ({
    landingContainer: {
        display: 'grid',
        position: 'relative',
        // top: '15em',
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
    let location = useLocation();

    let classes = useStyles();

    const cardTransition = useTransition(location, location => location.pathname, {
        from: {
            wait: 0,
            top: '20em',
        },
        enter: [
            {
                wait: 1
            },
            {
                wait: 0,
                top: '15em',
            }
        ],
        leave: {
            wait: 0,
            top: '15em',
        },
        config: animationSpringConfig,
    })

    let cardClasses = {
        root: classes.cardRoot,
    };

    let cardContentClasses = {
        root: classes.cardContentRoot,
    };

    return cardTransition.map(({ item, props, key }) => (
        <animated.div className={classes.landingContainer} key={key} style={props}>
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
        </animated.div>
    ))
    return (
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
    );
}

export default LandingPage;