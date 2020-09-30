import React from 'react';

import { Button, makeStyles } from '@material-ui/core';
import { Cell, Grid } from 'styled-css-grid';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    nodesGrid: {
        backgroundColor: '#0000004d',
        borderRadius: '0.5em',
        padding: '1.2em',
        marginRight: '2em',
        marginLeft: '2em',
        marginTop: '1em',
    },
    nodeContainer: {
        backgroundColor: 'var(--main-bg-color)',
        borderRadius: '5em',
        minWidth: 'unset',
        '&:hover': {
            backgroundColor: 'var(--main-bg-color)',
        },
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
    nodeDescriptionGrid: {
        paddingRight: '2em',
        paddingLeft: '2em',
        textAlign: 'center',
        color: 'white',
    },
    nodeDescriptionTitle: {
        paddingBottom: '0.5em',
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

const NodeMenu = ({ nodes, selectedNode, handleNodeClick }) => {
    let classes = useStyles();

    return (
        <Grid className={classes.nodesGrid} gap="0" columns="repeat(4, auto-fit)" rows="1fr" areas={["React NodeJS Express MongoDB"]}>
            {
                nodes.map((n, idx) => (
                    <Cell key={idx} area={n.title}>
                        <Node selected={selectedNode === idx} title={n.title} image={n.image} onClick={() => handleNodeClick(idx)} />
                    </Cell>
                ))
            }
        </Grid>
    );
}

export default NodeMenu;