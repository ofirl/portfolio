import { Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { Cell, Grid } from 'styled-css-grid';
import { animationSlowSpringConfig } from '../../utils/animationUtils';

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
    nodeDescriptionGrid: {
        paddingTop: '1em',
        paddingRight: '2em',
        paddingLeft: '2em',
        textAlign: 'center',
        color: 'white',
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
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                null,
                'description line 2'
            ]
        },
        {
            title: 'NodeJS',
            image: "/assets/images/logos/nodejs.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            title: 'Express',
            image: "/assets/images/logos/express.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        },
        {
            title: 'MongoDB',
            image: "/assets/images/logos/mongo.png",
            description: [
                'description very very very very very very very very very very very very very very very very very very very long line 1',
                'description line 2'
            ]
        }
    ];

    let nodeDescriptionTransitions = useTransition(selectedNode, null, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1
        },
        leave: {
            opacity: 0
        },
    });

    const handleNodeClick = (idx) => {
        setSelectedNode(idx);
    };

    return (
        <>
            <div className={classes.backgroundDiv} />
            <Grid gap="0" columns="1fr" rows="auto auto 1fr" areas={["nodes", "description", "projects"]}>
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
                <Cell area="description">
                    <Grid gap="0" columns="1fr" rows="auto 1fr" className={classes.nodeDescriptionGrid} areas={["title", "description"]}>
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell className="posRelative" area="title">
                                    <animated.div style={props} className="test">
                                        <Typography variant="h6">
                                            {nodes[item].title}
                                        </Typography>
                                    </animated.div>
                                </Cell>
                            ))
                        }
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell className="posRelative" area="description">
                                    <animated.div style={props} className="test">
                                        {
                                            nodes[item].description.map(t =>
                                                <Typography variant="body1">
                                                    {/* not a space!!! (altCode 0160) */}
                                                    {t ? t : ' '}
                                                </Typography>
                                            )
                                        }
                                    </animated.div>
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