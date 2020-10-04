import React, { useEffect, useState } from 'react';

import { IconButton, makeStyles } from '@material-ui/core';

// import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useBreakpoint from '../../../../customHooks/useBreakPoint';

import { animated, useTransition } from 'react-spring';

// import Swiper from "react-id-swiper";
// import SwiperCore, { EffectCoverflow } from 'swiper';
// import 'swiper/swiper.less';
// import 'swiper/components/effect-coverflow/effect-coverflow.less';

// import { Swiper, SwiperSlide } from 'swiper/react';

import Gallery from '../../../Gallery';

// SwiperCore.use([EffectCoverflow]);

const useStyles = makeStyles(theme => ({
    swiperGridContainer: {
        width: '100%',
        paddingBottom: '2em',
        '&[class*="Grid"]': {
            // height: '100%',
            height: ({ breakpointWidth, breakpointHeight }) => breakpointHeight === 0 ? '17em' : (breakpointWidth > 1 ? '25em' : '22em'),
        },
    },
    swiperControlsGrid: {
        paddingTop: '2em',
    },
    swiperControlsRoot: {
        color: 'white',
        backgroundColor: '#ffffff4d',
        '&:disabled': {
            opacity: '0.3',
            color: 'white',
            backgroundColor: '#ffffff4d',
        },
        '&:hover': {
            color: 'white',
            backgroundColor: '#ffffff4d',
        }
    },
}));

const smallGalleryConfig = {
    shadowBorderRadius: '1em',
};

const mediumGalleryConfig = {
    rotation: 10,
    shadowBorderRadius: '1em',
};

const largeGalleryConfig = {
    rotation: 0,
    scaleFactor: 0.08,
    shadowBorderRadius: '1em',
};

const SwiperContainer = ({ handleSlideChange, currentSlide, initialSlide = 0, children, goPrev, goNext, swiperKey }) => {
    let breakpoint = useBreakpoint("index");

    let [currentSwipers, setCurrentSwipers] = useState([]);

    let classes = useStyles({ breakpointWidth: breakpoint.width, breakpointHeight: breakpoint.height });

    let childrenNum = children == null ? 0 : (children.length ? children.length : 0);

    useEffect(() => {
        let galleryConfig;
        if (breakpoint.width <= 1)
            galleryConfig = smallGalleryConfig;
        else if (breakpoint.width < 3)
            galleryConfig = mediumGalleryConfig;
        else
            galleryConfig = largeGalleryConfig;

        const getSwiper = () => {
            return [{
                key: `${breakpoint.width}-${swiperKey}`,
                item: <Gallery initialSlide={initialSlide} activeSlide={currentSlide} onSlideChange={handleSlideChange} effectConfig={galleryConfig} config={{
                    slideWidth: breakpoint.width > 1 ? '12em' : '10em',
                }}>
                    {children}
                </Gallery>
            }];
        };

        setCurrentSwipers(getSwiper());

    }, [children, breakpoint, swiperKey, currentSlide, handleSlideChange, initialSlide])

    let swiperTransitions = useTransition(currentSwipers, item => item.key, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tesnion: 70 }
    });

    return (
        <Grid columns="1fr" rows="1fr auto" className={classes.swiperGridContainer} areas={["swiper", "controls"]}>
            {
                swiperTransitions.map(({ item, props, key }) => (
                    <Cell key={key} area="swiper">
                        <animated.div key={key} style={{ ...props, height: '100%' }}>
                            {item.item}
                        </animated.div>
                    </Cell>
                ))
            }
            <Cell area="controls">
                <Grid columnGap="1em" rows="1fr" columns="1fr auto auto 1fr" areas={['. left right .']} className={classes.swiperControlsGrid}>
                    <Cell area="left">
                        <IconButton disabled={currentSlide === 0} classes={{ root: classes.swiperControlsRoot }} onClick={goPrev}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Cell>
                    <Cell area="right">
                        <IconButton disabled={currentSlide === childrenNum - 1} classes={{ root: classes.swiperControlsRoot }} onClick={goNext}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Cell>
                </Grid>
            </Cell>
        </Grid>
    );
}

export default SwiperContainer;