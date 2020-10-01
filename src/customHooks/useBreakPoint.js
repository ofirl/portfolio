import { useState, useEffect } from 'react';
// import throttle from 'lodash/throttle';

const getDeviceWidthConfig = (width, returnType) => {
    let result;
    if (width <= 450) {
        result = {
            name: 'sm',
            index: 0,
        };
    } else if (width <= 650) {
        result = {
            name: 'md',
            index: 1,
        };
    } else if (width <= 1024) {
        result = {
            name: 'lg',
            index: 2,
        };
    }
    else if (width <= 1400) {
        result = {
            name: 'xlg',
            index: 3,
        };
    }
    else {
        result = {
            name: 'xxlg',
            index: 4,
        };
    }

    return result[returnType];
};

const getDeviceHeightConfig = (height, returnType) => {
    let result;
    if (height <= 450) {
        result = {
            name: 'sm',
            index: 0,
        };
    }
    else {
        result = {
            name: 'lg',
            index: 1,
        };
    }

    return result[returnType];
};

const useBreakpoint = (returnType = "name") => {
    const [breakPoint, setBreakPoint] = useState(() => ({
        width: getDeviceWidthConfig(window.innerWidth, returnType),
        height: getDeviceHeightConfig(window.innerHeight, returnType),
    }));

    useEffect(() => {
        // const calcInnerWidth = throttle(function() {
        //   setBreakPoint(getDeviceConfig(window.innerWidth, returnType))
        // }, 200);
        const calcInnerWidth = () => {
            setBreakPoint({
                width: getDeviceWidthConfig(window.innerWidth, returnType),
                height: getDeviceHeightConfig(window.innerHeight, returnType),
            })
        };
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, [returnType]);

    return breakPoint;
}

export const screenWidth = getDeviceWidthConfig(window.innerWidth, "name");
export const indexedScreenWidth = getDeviceWidthConfig(window.innerWidth, "index");
export const screenHeight = getDeviceHeightConfig(window.innerHeight, "name");
export const indexedScreenHeight = getDeviceHeightConfig(window.innerHeight, "index");

export default useBreakpoint;