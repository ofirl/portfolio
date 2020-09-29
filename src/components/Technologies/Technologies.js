import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    backgroundDiv: {
        position: 'absolute',
        zIndex: '-1',
        transform: 'scale(1.5)',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundImage: 'url("/assets/images/background-doodle-tech.png")',
        backgroundSize: 'contain',
        '&:after': {
            content: "''",
            background: '#333333e6',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
        }
    }
}));

const Technologies = () => {
    let classes = useStyles();

    return (
        <>
            <div className={classes.backgroundDiv}>

            </div>
            <div style={{ zIndex: '20' }}>
                Technologies
        </div>
        </>
    );
}

export default Technologies;