import clsx from 'clsx';
import React, { useMemo } from 'react';

const GallerySlide = ({ children, config, slideOffset, onSlideClick }) => {
    const slideCssVariables = useMemo(() => ({
        '--slide-offset': slideOffset,
        '--slide-offset-abs': Math.abs(slideOffset),
    }), [slideOffset]);

    const activeSlide = useMemo(() => slideOffset === 0,
        [slideOffset]
    );

    return (
        <div className={clsx("gallery-slide", { 'gallery-slide-active': activeSlide })}
            style={{ ...slideCssVariables, width: config.slideWidth, height: '100%' }}
        >
            {
                config.slideShadows && !activeSlide &&
                <div className={clsx("gallery-slide-shadow", { 'gallery-slide-shadow-right': slideOffset > 0, 'gallery-slide-shadow-left': slideOffset < 0 })} />
            }
            {
                onSlideClick && slideOffset !== 0 &&
                <div className="fill-parent above-all" onClick={onSlideClick} />
            }
            {children}
        </div>
    );
}

export default GallerySlide;