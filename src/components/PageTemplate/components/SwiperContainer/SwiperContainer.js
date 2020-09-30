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
    swiperGridContainer: {

    },
    swiperContainer: {
        height: '18em',
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

const SwiperContainer = ({ swiperRef, handleSlideChange, currentSlide, children, goPrev, goNext }) => {
    let breakPoint = useBreakpoint("index");

    let classes = useStyles();

    const swiperParams = {
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

    let childrenNum = children == null ? 0 : (children.length ? children.length : 0);
    
    return (
        <Grid columns="1fr" rows="1fr auto" className={classes.swiperGridContainer}>
            <Cell>
                <Swiper
                    ref={swiperRef}
                    initialSlide={0}
                    containerClass={clsx(classes.swiperContainer)}
                    // slideClass={clsx('test')}
                    {...swiperParams}
                    on={{
                        slideChange: handleSlideChange
                    }}
                >
                    {children}
                </Swiper>
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