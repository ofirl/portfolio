import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { Spring } from 'react-spring/renderprops';
import { useDrag } from 'react-use-gesture';

import GallerySlide from './components/GallerySlide/GallerySlide';
import MeasurePixelSize from './components/MeasurePixelSize/MeasurePixelSize';
import MouseBlocker from './components/MouseBlocker/MouseBlocker';
import useDimensions from './CustomHooks/useDimensions';

import baseConfig from './defaultConfigs/baseConfig';
import coverflowBaseConfig from './defaultConfigs/coverflowEffect';

import './sass/Gallery.sass';

const effectBaseConfigs = {
    coverflow: coverflowBaseConfig
};

const Gallery = ({ children, initialSlide = 0, activeSlide, config: configOverride, effectConfig, effect = 'coverflow', onSlideChange }) => {
    const activeSlideClamped = useMemo(() => {
        if (activeSlide == null)
            return null;

        if (activeSlide < 0)
            return 0;
        if (activeSlide >= children.length)
            return children.length - 1;

        return activeSlide;
    }, [activeSlide, children.length])

    const [currentSlide, setCurrentSlide] = useState(activeSlideClamped != null ? activeSlideClamped : initialSlide);

    const handelSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
        onSlideChange && onSlideChange(newSlide);
    };

    const moveToSlide = (newSlide) => {
        handelSlideChange(newSlide);
    };

    const [slidePixelSize, setSlidePixelSize] = useState(0);
    const [slideGapPixelSize, setSlideGapPixelSize] = useState(0);

    const [isDragged, setIsDragged] = useState(false);
    const [dragOffset, setDragOffset] = useState(initialSlide);

    const [galleryContainerRef, galleryDimensions] = useDimensions();

    const slideSizeChangeHandler = ({ width, height }) => {
        setSlidePixelSize(width);
    };

    const slideGapSizeChangeHandler = ({ width, height }) => {
        setSlideGapPixelSize(width);
    };

    const config = useMemo(() => ({
        // base
        ...baseConfig,
        slidePixelSize,
        slideGapPixelSize,
        // effects
        [effect]: {
            ...effectBaseConfigs[effect],
            ...effectConfig,
        },
        // overrides
        ...configOverride
    }), [configOverride, effect, slidePixelSize, slideGapPixelSize, effectConfig]);

    const dragBind = useDrag(({ event, movement: [movementX, movementY], initial, first, last, swipe: [swipeX, swipeY], tap, ...others }) => {
        event.preventDefault();

        if (!tap)
            event.stopPropagation();

        if (last) {
            let newCurrentSlide = currentSlide - Math.round((movementX * config.slideChangeDragFactor) / (slidePixelSize + slideGapPixelSize));

            // clamp value
            if (newCurrentSlide < 0)
                newCurrentSlide = 0;
            if (newCurrentSlide >= children.length)
                newCurrentSlide = children.length - 1;

            handelSlideChange(newCurrentSlide);
            setIsDragged(false);
            return;
        }

        if (first)
            setIsDragged(true);

        setDragOffset(movementX);
    }, {
        axis: 'x',
        filterTaps: true,
    });

    const dragBindProps = useMemo(() => config.enableDragging ? dragBind() : null,
        [dragBind, config.enableDragging]
    );

    const styleCssVariables = useMemo(() => {
        // general
        let general = {
            '--gallery-width': galleryDimensions.width,
            '--slide-width': config.slidePixelSize,
            '--slide-gap': config.slideGap,
            '--base-slide-offset': config.centeredItems ? `${galleryDimensions.width / 2}px` : '0px'
        };

        // effects
        let effects = {
            '--coverflow-rotation': config.coverflow.rotation,
            '--coverflow-scaleFactor': config.coverflow.scaleFactor
        };

        return {
            ...general,
            ...effects,
        };
    }, [config, galleryDimensions.width])

    const springProps = useMemo(() => isDragged ?
        {
            to: { dragOffset: dragOffset },
            config: { tension: 10000, clamp: true },
        } : {
            to: {
                dragOffset: 0,
                currentSlide: activeSlideClamped != null ? activeSlideClamped : currentSlide,
            }
        }, [isDragged, activeSlideClamped, dragOffset, currentSlide]);
    
    return (
        <>
            <MeasurePixelSize width={config.slideWidth} onChange={slideSizeChangeHandler} />
            <MeasurePixelSize width={config.slideGap} onChange={slideGapSizeChangeHandler} />
            <Spring
                {...springProps}
            >
                {({ dragOffset: dragOffsetAnimated, currentSlide: currentSlideAnimated }) => (
                    <div ref={galleryContainerRef} {...dragBindProps} style={{ ...styleCssVariables }}
                        className={clsx("gallery-container", `gallery-${effect}`, { 'grab-cursor': config.grabCursor })}
                    >
                        {
                            ((config.disableInteractionWhileDragging && isDragged) || !config.enableSlideInteraction) &&
                            <MouseBlocker />
                        }
                        {children.map((c, idx) =>
                            <GallerySlide key={idx} config={config} onSlideClick={config.clickToMoveToSlide ? () => moveToSlide(idx) : null}
                                slideOffset={idx - currentSlideAnimated + dragOffsetAnimated / config.slidePixelSize}>
                                {c}
                            </GallerySlide>
                        )}
                    </div>
                )}
            </Spring>
        </>
    );
}

export default Gallery;