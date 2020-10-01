import React, { useMemo } from 'react';

import { Button, makeStyles } from '@material-ui/core';
import { Cell, Grid } from 'styled-css-grid';
import clsx from 'clsx';
import useBreakpoint from '../../../../customHooks/useBreakPoint';

const useStyles = makeStyles(theme => ({
    nodesGrid: {
        backgroundColor: ({ breakpoint }) => breakpoint > 1 ? null : '#0000004d',
        borderRadius: '0.5em',
        padding: ({ breakpoint }) => breakpoint > 1 ? null : '1.2em',
        marginRight: ({ breakpoint }) => breakpoint > 1 ? null : '2em',
        marginLeft: '2em',
        marginTop: '1em',
        position: 'relative',
    },
    centerVerticalLine: {
        position: 'absolute',
        left: '1.2em',
        width: '0.3em',
        height: '100%',
        background: 'var(--main-bg-color-darker)',
    },
    nodeContainer: {
        backgroundColor: ({ breakpoint }) => breakpoint > 1 ? 'var(--main-bg-color-darker)' : 'var(--main-bg-color)',
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

const layouts = {
    small: {
        columns: "repeat(4, auto)",
        rows: "1fr",
        gap: "0",
    },
    big: {
        rows: "repeat(4, auto)",
        columns: "1fr",
        gap: "2em",
    }
}

const getPageLayout = (breakpoint) => {
    if (breakpoint > 1)
        return layouts.big;

    return layouts.small;
};

const Node = ({ image, title, selected, onClick }) => {
    let {width: breakpoint} = useBreakpoint("index");

    let classes = useStyles({ breakpoint });

    return (
        <Button classes={{ root: classes.nodeContainer }} onClick={onClick}>
            <img className={classes.nodeImage} src={image} alt={title} />
            <span className={clsx(classes.nodeTitle, { [classes.nodeTitleSelected]: selected })}> {title} </span>
        </Button>
    );
};

const NodeMenu = ({ nodes, selectedNode, handleNodeClick }) => {
    let {width: breakpoint} = useBreakpoint("index");

    let classes = useStyles({ breakpoint });

    let gridLayout = useMemo(() =>
        getPageLayout(breakpoint),
        [breakpoint]
    );

    return (
        <Grid className={classes.nodesGrid} gap="0" {...gridLayout}>
            {
                breakpoint > 1 && <div className={classes.centerVerticalLine} />
            }
            {
                nodes.map((n, idx) => (
                    <Cell key={idx}>
                        <Node selected={selectedNode === idx} title={n.title} image={n.image} onClick={() => handleNodeClick(idx)} />
                    </Cell>
                ))
            }
        </Grid>
    );
}

export default NodeMenu;