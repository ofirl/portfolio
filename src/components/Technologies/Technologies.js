import React from 'react';
import { Link } from 'react-router-dom';

const Technologies = () => {
    return (
        <div style={{zIndex: '20'}}>
            Technologies
            <Link to="/projects"> projects </Link>
            <Link to="/"> home </Link>
        </div>
    );
}

export default Technologies;