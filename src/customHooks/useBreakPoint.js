import { useState, useEffect } from 'react';
// import throttle from 'lodash/throttle';

const getDeviceConfig = (width, returnType) => {
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

const useBreakpoint = (returnType = "name") => {
    const [breakPoint, setBreakPoint] = useState(() => getDeviceConfig(window.innerWidth, returnType));

    useEffect(() => {
        // const calcInnerWidth = throttle(function() {
        //   setBreakPoint(getDeviceConfig(window.innerWidth, returnType))
        // }, 200);
        const calcInnerWidth = () => {
            setBreakPoint(getDeviceConfig(window.innerWidth, returnType))
        };
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, [returnType]);

    return breakPoint;
}

export const screenSize = getDeviceConfig(window.innerWidth, "name");
export const indexedScreenSize = getDeviceConfig(window.innerWidth, "index");
export default useBreakpoint;