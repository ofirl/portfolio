import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const useStyles = makeStyles(theme => ({
    backgroundOuterContainer: {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        overflow: 'hidden',
        height: '100vh',
        transformOrigin: 'top',
        zIndex: '1',
    },
    backgroundContainer: {
        overflow: 'hidden',
        transform: 'scale(1.1)',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    },
    backgroundLayer: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
    },
    backgroundLayerFixed: {
        // transform: 'translate(16.6px, -15.7px)',
        backgroundImage: 'url("/assets/images/background-doodle-layer-fixed.png")',
    },
    backgroundLayer1: {
        // transform: 'translate(16.6px, -15.7px)',
        backgroundImage: 'url("/assets/images/background-doodle-layer1.png")',
    },
    backgroundLayer2: {
        // transform: 'translate(16.6px, -15.7px)',
        backgroundImage: 'url("/assets/images/background-doodle-layer2.png")',
    },
}));

const AnimatedBackground = () => {
    let [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    let classes = useStyles();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => { window.removeEventListener('mousemove', handleMouseMove) };
    }, [])

    const mousePositionFactor = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const trans1 = (x, y) => `translate(${x / 20}px,${y / 20}px)`;
    const trans2 = (x, y) => `translate(${x / 15}px,${y / 15}px)`;
    const trans3 = (x, y) => `translate(${x / 10}px,${y / 10}px)`;

    const animationProps = useSpring({ xy: mousePositionFactor(mousePos.x, mousePos.y), config: { mass: 10, tension: 550, friction: 240 } });

    return (
        <div className={classes.backgroundOuterContainer}>
            <div className={classes.backgroundContainer}>
                <animated.div className={clsx(classes.backgroundLayer, classes.backgroundLayerFixed)} style={{ transform: animationProps.xy.interpolate(trans1) }}>
                </animated.div>
                <animated.div className={clsx(classes.backgroundLayer, classes.backgroundLayer1)} style={{ transform: animationProps.xy.interpolate(trans2) }}>
                </animated.div>
                <animated.div className={clsx(classes.backgroundLayer, classes.backgroundLayer2)} style={{ transform: animationProps.xy.interpolate(trans3) }}>
                </animated.div>
            </div>
        </div>
    );
}

export default AnimatedBackground;