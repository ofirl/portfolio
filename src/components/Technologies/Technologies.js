import React from 'react';
import { Link } from 'react-router-dom';

const Technologies = () => {
    return (
        <div>
            Technologies
            <Link to="/projects"> projects </Link>
            <Link to="/"> home </Link>
        </div>
    );
}

export default Technologies;