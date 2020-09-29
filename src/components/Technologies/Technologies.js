import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Cell, Grid } from 'styled-css-grid';

const useStyles = makeStyles(theme => ({
    backgroundDiv: {
        position: 'fixed',
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
        },
    },
    nodesGrid: {
        backgroundColor: '#0000004d',
        borderRadius: '0.5em',
        padding: '1.5em',
        marginRight: '2em',
        marginLeft: '2em',
        marginTop: '1em',
    },
    nodeContainer: {
        backgroundColor: 'var(--main-bg-color)',
        borderRadius: '5em',
        // padding: '0.2em',
        minWidth: 'unset',
    },
    nodeImage: {
        height: '2em',
        width: '2em',
    },
    nodeTitle: {
        transition: 'all 0.5s linear',
        maxWidth: '0px',
        color: 'white',
        display: 'inline-block',
        overflow: 'hidden',
        textTransform: 'initial',
        fontWeight: 'normal',
        opacity: '0',
    },
    nodeTitleSelected: {
        paddingRight: '0.5em',
        paddingLeft: '0.5em',
        maxWidth: '10em',
        opacity: '1',
    },
}));

const Node = ({ image, title, selected, onClick }) => {
    let classes = useStyles();

    return (
        <Button classes={{ root: classes.nodeContainer }} onClick={onClick}>
            <img className={classes.nodeImage} src={image} alt={title} />
            <span className={clsx(classes.nodeTitle, { [classes.nodeTitleSelected]: selected })}> {title} </span>
        </Button>
    );
};

const Technologies = () => {
    let [selectedNode, setSelectedNode] = useState(0);

    let classes = useStyles();

    const nodes = [
        {
            title: 'React',
            image: "/assets/images/logos/react.png",
        },
        {
            title: 'NodeJS',
            image: "/assets/images/logos/nodejs.png",
        },
        {
            title: 'Express',
            image: "/assets/images/logos/express.png",
        },
        {
            title: 'MongoDB',
            image: "/assets/images/logos/mongo.png",
        }
    ];

    const handleNodeClick = (idx) => {
        setSelectedNode(idx);
    };

    return (
        <>
            <div className={classes.backgroundDiv} />
            <Grid gap="0" columns="1fr" rows="auto auto 1fr" areas={["nodes description projects"]}>
                <Cell area="nodes">
                    <Grid className={classes.nodesGrid} gap="0" columns="1fr repeat(4, auto) 1fr" rows="1fr" areas={[". React NodeJS Express MongoDB"]}>
                        {
                            nodes.map((n, idx) => (
                                <Cell key={idx} area={n.title}>
                                    <Node selected={selectedNode === idx} title={n.title} image={n.image} onClick={() => handleNodeClick(idx)} />
                                </Cell>
                            ))
                        }
                    </Grid>
                </Cell>
            </Grid>
        </>
    );
}

export default Technologies;