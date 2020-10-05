import clsx from 'clsx';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    const clampSlide = useCallback((slide) => {
        if (slide < 0)
            return 0;
        if (slide >= children.length)
            return children.length - 1;

        return slide;
    }, [children]);

    const [currentSlide, setCurrentSlide] = useState(activeSlide != null ? clampSlide(activeSlide) : initialSlide);
    const [overrideCurrentSlide, setOverrideCurrentSlide] = useState(null);

    const activeSlideClamped = useMemo(() => {
        if (overrideCurrentSlide != null)
            return overrideCurrentSlide;

        if (activeSlide == null)
            return currentSlide;

        return clampSlide(activeSlide);
    }, [activeSlide, clampSlide, currentSlide, overrideCurrentSlide])

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

    const [galleryContainerRef, galleryDimensions] = useDimensions();
    const galleryWrapperRef = useRef();

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

    const slidesRef = useRef([]);
    const onSpringEnd = useRef(null);

    const dragBind = useDrag(({ event, movement: [movementX, movementY], initial, first, last, swipe: [swipeX, swipeY], tap, ...others }) => {
        if (!tap)
            event.stopPropagation();

        if (last) {
            let newCurrentSlide = activeSlideClamped - Math.round((movementX * config.slideChangeDragFactor) / (slidePixelSize + slideGapPixelSize));

            // clamp value
            if (newCurrentSlide < 0)
                newCurrentSlide = 0;
            if (newCurrentSlide >= children.length)
                newCurrentSlide = children.length - 1;

            // set spring end function
            onSpringEnd.current = () => {
                handelSlideChange(newCurrentSlide);
                setIsDragged(false);
                setOverrideCurrentSlide(null);
                onSpringEnd.current = null;
            };

            setOverrideCurrentSlide(activeSlideClamped - movementX / config.slidePixelSize);

            return;
        }

        slidesRef.current.forEach(({ ref, idx }) => {
            let slideOffset = idx - activeSlideClamped + movementX / config.slidePixelSize;
            ref.current.style.setProperty('--slide-offset', slideOffset);
            ref.current.style.setProperty('--slide-offset-abs', Math.abs(slideOffset));
            if (effect === "coverflow")
                ref.current.style.setProperty('--rotation-relative', 90 - Math.abs(((Math.abs(slideOffset) * config.coverflow.rotation) % 180) - 90));
        });

        galleryWrapperRef.current.style.setProperty('--active-slide', activeSlideClamped - movementX / config.slidePixelSize);

        if (!tap && isDragged === false)
            setIsDragged(true);
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
            '--slide-gap': config.slideGapPixelSize,
        };

        // effects
        let effects = {
            '--base-slide-offset': config.centeredItems ? `${galleryDimensions.width / 2}px` : '0px',
            '--active-slide': activeSlideClamped,
            '--coverflow-rotation': config.coverflow.rotation,
            '--coverflow-scaleFactor': config.coverflow.scaleFactor,
            '--coverflow-shadow-border-radius': config.coverflow.shadowBorderRadius,
        };

        return {
            ...general,
            ...effects,
        };
    }, [config, galleryDimensions.width, activeSlideClamped])

    const springProps = useMemo(() => isDragged ?
        {
            to: {
                currentSlide: activeSlideClamped,
            },
            // config: { tension: 1000000, clamp: true },
            config: { duration: 1 },
        } : {
            to: {
                currentSlide: activeSlideClamped,
            },
        }, [isDragged, activeSlideClamped]);

    return (
        <>
            <MeasurePixelSize width={config.slideWidth} onChange={slideSizeChangeHandler} />
            <MeasurePixelSize width={config.slideGap} onChange={slideGapSizeChangeHandler} />
            <Spring
                onRest={() => onSpringEnd.current && onSpringEnd.current()}
                {...springProps}
            >
                {({ currentSlide: currentSlideAnimated }) => (
                    <div ref={galleryContainerRef} {...dragBindProps} style={{ ...styleCssVariables }}
                        className={clsx("gallery-container", `gallery-${effect}`, { 'grab-cursor': config.grabCursor })}
                    >
                        <div ref={galleryWrapperRef} style={{ '--active-slide': currentSlideAnimated }} className={clsx("gallery-wrapper", `gallery-wrapper`)}>
                            {
                                ((config.disableInteractionWhileDragging && isDragged) || !config.enableSlideInteraction) &&
                                <MouseBlocker />
                            }
                            {children.map((c, idx) =>
                                <GallerySlide key={idx} idx={idx} config={config} onSlideClick={config.clickToMoveToSlide ? () => moveToSlide(idx) : null}
                                    slidesRef={slidesRef} slideOffset={idx - currentSlideAnimated}
                                >
                                    {c}
                                </GallerySlide>
                            )}
                        </div>
                    </div>
                )}
            </Spring>
        </>
    );
}

export default Gallery;