import React from 'react';

import { Card, makeStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        position: 'absolute',
        right: '50%',
    }
}));

const LandingPage = () => {
    let classes = useStyles();

    let cardClasses = {
        root: classes.cardRoot,
    };

    // return (
    //     <Card classes={cardClasses}>
    //         asdasdadsad
    //     </Card>
    // );

    return (
        <div>
            LandingPage
            <Link to="/projects"> projects </Link>
            <Link to="/technologies"> technologies </Link>
        </div>
    );
}

export default LandingPage;