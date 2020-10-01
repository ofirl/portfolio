import React, { useEffect, useState } from 'react';

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
import { animated, useTransition } from 'react-spring';

SwiperCore.use([EffectCoverflow]);

const useStyles = makeStyles(theme => ({
    swiperContainer: {
        height: ({ breakpointWidth, breakpointHeight }) => breakpointHeight === 0 ? '12em' : (breakpointWidth > 1 ? '25em' : '18em'),
        overflow: 'hidden',
        '& .swiper-slide': {
            display: 'grid',
            justifyItems: 'center',
            '& [class*="swiper-slide-shadow"]': {
                borderRadius: '1em',
            },
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
    slidesPerView: 2,
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

const mediumSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.5,
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

const largeSwiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
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

const SwiperContainer = ({ swiperRef, handleSlideChange, currentSlide, children, goPrev, goNext, swiperKey }) => {
    let breakpoint = useBreakpoint("index");

    let [currentSwipers, setCurrentSwipers] = useState([]);

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

        return [{
            key: `${breakpoint.width}-${swiperKey}`,
            item: <Swiper
                key={`${breakpoint.width}-${swiperKey}`}
                ref={swiperRef}
                initialSlide={currentSlide}
                containerClass={clsx(classes.swiperContainer)}
                {...swiperParams}
                on={{
                    slideChange: handleSlideChange
                }}
            >
                {children}
            </Swiper>
        }];
    };

    // useEffect(() => {
    //     const updateRef = (el, itemSwiperKey) => {
    //         if (currentSwipers[0] && currentSwipers[0].key === swiperKey)
    //             swiperRef.current = el;
    //     }

    //     const getSwiper = () => {
    //         let swiperParams;
    //         if (breakpoint.width <= 1)
    //             swiperParams = smallSwiperParams;
    //         else if (breakpoint.width < 3)
    //             swiperParams = mediumSwiperParams;
    //         else if (breakpoint.width < 4)
    //             swiperParams = largeSwiperParams;
    //         else
    //             swiperParams = xlargeSwiperParams;

    //         return [{
    //             key: `${breakpoint.width}-${swiperKey}`,
    //             item: <Swiper
    //                 key={`${breakpoint.width}-${swiperKey}`}
    //                 ref={(el) => updateRef(el, swiperKey)}
    //                 // ref={swiperRef}
    //                 initialSlide={currentSlide}
    //                 containerClass={clsx(classes.swiperContainer)}
    //                 {...swiperParams}
    //                 on={{
    //                     slideChange: handleSlideChange
    //                 }}
    //             >
    //                 {children}
    //             </Swiper>
    //         }];
    //     };

    //     setCurrentSwipers(getSwiper());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [children, breakpoint, swiperKey])

    let swiperTransitions = useTransition(currentSwipers, item => item.key, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        <Grid columns="1fr" rows="1fr auto" className={classes.swiperGridContainer} areas={["swiper", "controls"]}>
            <Cell>
                {
                    getSwiper()[0].item
                }
            </Cell>
            {/* {
                swiperTransitions.map(({ item, props, key }) => (
                    <Cell key={key} area="swiper">
                        <animated.div key={key} style={props}>
                            {item.item}
                        </animated.div>
                    </Cell>
                ))
            } */}
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