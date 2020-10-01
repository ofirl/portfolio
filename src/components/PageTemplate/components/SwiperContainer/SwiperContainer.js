import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';

import clsx from 'clsx';
import { Cell, Grid } from 'styled-css-grid';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Swiper from "react-id-swiper";
import SwiperCore, { EffectCoverflow } from 'swiper';
import 'swiper/swiper.less';
import 'swiper/components/effect-coverflow/effect-coverflow.less';
import useBreakpoint from '../../../../customHooks/useBreakPoint';

SwiperCore.use([EffectCoverflow]);

const useStyles = makeStyles(theme => ({
    swiperContainer: {
        height: ({ breakpointWidth, breakpointHeight }) => breakpointHeight === 0 ? '12em' : (breakpointWidth > 1 ? '25em' : '18em'),
        overflow: 'hidden',
        '& .swiper-slide': {
            display: 'grid',
            justifyItems: 'center',
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

const smallSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.3,
    coverflowEffect: {
        rotate: -30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    spaceBetween: 5,
    slideShadows: false,
};

const mediumSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.5,
    coverflowEffect: {
        rotate: -30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    spaceBetween: 5,
    slideShadows: false,
};

const largeSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: -15,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    spaceBetween: 5,
    slideShadows: false,
};

const xlargeSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 5,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    spaceBetween: 20,
    slideShadows: false,
};

const SwiperContainer = ({ swiperRef, handleSlideChange, currentSlide, children, goPrev, goNext }) => {
    let breakpoint = useBreakpoint("index");

    let classes = useStyles({ breakpointWidth: breakpoint.width, breakpointHeight: breakpoint.height });

    let childrenNum = children == null ? 0 : (children.length ? children.length : 0);

    const getSwiper = () => {
        let swiperParams;
        if (breakpoint.width <= 1)
            swiperParams = smallSwiperParams;
        else if (breakpoint.width < 3)
            swiperParams = mediumSwiperParams;
        else if (breakpoint.width < 4)
            swiperParams = largeSwiperParams;
        else
            swiperParams = xlargeSwiperParams;

        return <Swiper
            key={breakpoint.width}
            ref={swiperRef}
            initialSlide={currentSlide}
            containerClass={clsx(classes.swiperContainer)}
            {...swiperParams}
            on={{
                slideChange: handleSlideChange
            }}
        >
            {children}
        </Swiper>;
    };

    return (
        <Grid columns="1fr" rows="1fr auto" className={classes.swiperGridContainer}>
            <Cell>
                {
                    getSwiper()
                }
            </Cell>
            <Cell>
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