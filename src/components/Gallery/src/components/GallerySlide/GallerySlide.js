import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';

const GallerySlide = ({ children, idx, config, slidesRef, slideOffset, onSlideClick }) => {
    const divRef = useRef();

    const slideCssVariables = useMemo(() => ({
        '--slide-offset': slideOffset,
        '--slide-offset-abs': Math.abs(slideOffset),
    }), [slideOffset]);

    const activeSlide = useMemo(() => slideOffset === 0,
        [slideOffset]
    );

    useEffect(() => {
        slidesRef.current.push({ref: divRef, idx});

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => slidesRef.current.splice(slidesRef.current.findIndex(s => s.ref === divRef), 1);
    }, [slidesRef, divRef, idx])

    return (
        <div ref={divRef} className={clsx("gallery-slide", { 'gallery-slide-active': activeSlide })}
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