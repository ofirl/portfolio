import React from 'react';

import { useTransition } from 'react-spring';

import { animationSpringConfig } from '../../../../utils/animationUtils';

import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';

const BackgroundManager = ({ prevLocation, location }) => {
    // background transitions
    const backgroundTransitions = useTransition(location, location => location.pathname, {
        from: item => {
            if (prevLocation.current === "/")
                return { wait: 0, opacity: 1 };

            return { wait: 0, opacity: 0 };
        },
        enter: item => {
            if (location.pathname === "/")
                return [{ wait: 1 }, { wait: 0, opacity: 1 }];

            return { wait: 0, opacity: 0 };
        },
        leave: item => {
            if (location.pathname === "/" || prevLocation.current !== "/")
                return { wait: 0, opacity: 0 };

            return { wait: 0, opacity: 1 };
        },
        config: animationSpringConfig,
    });

    return (
        <>
            {
                backgroundTransitions.map(({ item, props, key }) => (
                    <AnimatedBackground key={key} animatedStyle={props} />
                ))
            }
        </>
    );
}

export default BackgroundManager;