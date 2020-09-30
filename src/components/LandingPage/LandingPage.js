import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import { animated, useTransition } from 'react-spring';

import { animationSpringConfig } from '../../utils/animationUtils';
import useBreakpoint from '../../customHooks/useBreakPoint';

const useStyles = makeStyles(theme => ({
    landingContainer: {
        display: 'grid',
        position: 'relative',
        zIndex: '5',
        justifyItems: ({ breakPoint }) => breakPoint > 0 ? 'center' : null,
    },
    cardRoot: {
        borderRadius: ({ breakPoint }) => breakPoint > 0 ? '2em' : null,
        background: '#ffffffde',
        maxWidth: ({ breakPoint }) => breakPoint > 0 ? '30em' : null,
    },
    cardContentRoot: {
        textAlign: 'center',
        paddingTop: '7em',
    },
    landingTextLinksContainer: {
        position: 'relative',
        bottom: '0px',
        transition: 'all 0.3s linear',
        marginRight: '0.3em',
        marginLeft: '0.3em',
        '&:hover': {
            bottom: '2px',
            transform: 'translateY(5px)',
            '& > span:after': {
                width: '0',
            },
        },
        '& > span': {
            color: 'var(--landing-links-color)',
            fontWeight: '700',
            '&:after': {
                transition: 'all 0.3s linear',
                transform: 'translateX(-50%)',
                width: '100%',
                content: "''",
                background: 'var(--landing-links-color)',
                height: '2px',
                display: 'inline-block',
                position: 'absolute',
                bottom: '0',
                left: '50%',
            },
        },
    },
}));

const LandingPage = () => {
    let location = useLocation();
    let breakPoint = useBreakpoint("index");

    let classes = useStyles({ breakPoint });

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
                        I am Ofir Levi, A Software Developer with 4+ years of software development experience on various platforms, passionate to build polished, innovative and well-detailed apps with fluid animations to complement the design.
                        <br /><br />
                        Checkout my
                        <Link to="/technologies" className={classes.landingTextLinksContainer}>
                            <span>
                                {`Technologies`}
                            </span>
                        </Link>
                        and
                        <Link to="/projects" className={classes.landingTextLinksContainer}>
                            <span>
                                {`Projects`}
                            </span>
                        </Link>
                        that I worked on.
                        </Typography>
                </CardContent>
            </Card>
        </animated.div>
    ))
}

export default LandingPage;