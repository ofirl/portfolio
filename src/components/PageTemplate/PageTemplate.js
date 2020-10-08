import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router';

import { makeStyles, Typography } from '@material-ui/core';

import { Cell, Grid } from 'styled-css-grid';
import clsx from 'clsx';

import { animated, useTransition } from 'react-spring';

import NodeMenu from './components/NodeMenu/NodeMenu';
import SwiperContainer from './components/SwiperContainer/SwiperContainer';

import useBreakpoint from '../../customHooks/useBreakPoint';

import { backgroundDataContext } from '../../context/backgroundDataContext';

const useStyles = makeStyles(theme => ({
    pageGrid: {
        '&[class*="Grid"]': {
            height: '100%',
        },
    },
    nodeBigImage: {
        height: '14em',
        width: '14em',
    },
    nodeDescriptionGrid: {
        paddingRight: '2em',
        paddingLeft: '2em',
        textAlign: ({ breakpointWidth }) => breakpointWidth > 1 ? null : 'center',
        color: 'white',
    },
    nodeDescriptionTitle: {
        paddingBottom: '0.5em',
        fontWeight: ({ breakpointWidth }) => breakpointWidth > 1 ? '400' : null,
    },
    nodeDescriptionTextCell: {
        paddingLeft: ({ breakpointWidth }) => breakpointWidth > 1 ? '2em' : null,
    },
    projectsCell: {
        display: 'grid',
        alignItems: 'end',
    },
}));

const layouts = {
    landscape: {
        columns: "7em minmax(15em, 20em) minmax(15em, auto)",
        rows: "1fr",
        areas: ["nodes description projects"]
    },
    small: {
        columns: "1fr",
        rows: "auto 10em 1fr",
        areas: ["nodes", "description", "projects"],
    },
    medium: {
        columns: "7em minmax(15em, 40%) minmax(15em, 60%)",
        rows: "minmax(2em, auto) minmax(23em, auto) auto 1fr",
        areas: ["nodes . .", "nodes icon projects", ". description projects", ". description ."],
    },
};

const getPageLayout = (breakpoint) => {
    if (breakpoint.height === 0)
        return layouts.landscape;

    if (breakpoint.width <= 1)
        return layouts.small;
    else
        return layouts.medium;
};

const PageTemplate = ({ nodes, swiperItems, swiperFilterKey, swiperItemComponent: SwiperItemComponent, pagePath }) => {
    let breakpoint = useBreakpoint("index");

    let { node: defaultSelectedNode } = useParams();

    let { data, setData } = useContext(backgroundDataContext);

    let [selectedNode, setSelectedNode] = useState(0);
    let [currentSlide, setCurrentSlide] = useState(0);

    let classes = useStyles({ breakpointWidth: breakpoint.width });

    useEffect(() => {
        if (data.currentNodeIdx === 0)
            return;

        let currentNodeIndex;
        if (defaultSelectedNode == null)
            currentNodeIndex = 0;
        else
            currentNodeIndex = nodes.findIndex(n => n.key === defaultSelectedNode)

        setData({ currentNode: nodes[currentNodeIndex], currentNodeIdx: currentNodeIndex });
        setSelectedNode(currentNodeIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let gridLayout = useMemo(() =>
        getPageLayout(breakpoint),
        [breakpoint]
    );

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
        setData({ currentNode: nodes[idx], currentNodeIdx: idx });
    };

    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
    }

    const goNext = () => {
        handleSlideChange(currentSlide + 1);
    };
    const goPrev = () => {
        handleSlideChange(currentSlide - 1);
    };

    return (
        <>
            <Grid gap="0" {...gridLayout} className={classes.pageGrid}>
                <Cell area="nodes">
                    <NodeMenu nodes={nodes} handleNodeClick={handleNodeClick} selectedNode={selectedNode} />
                </Cell>
                {
                    breakpoint.height > 0 && breakpoint.width > 1 && nodeDescriptionTransitions.map(({ item, key, props }) => (
                        <Cell key={key} area="icon" className='horizontal-align vertical-align'>
                            <animated.div style={props}>
                                <img className={classes.nodeBigImage} src={nodes[item].image} alt={nodes[item].title} />
                            </animated.div>
                        </Cell>
                    ))
                }
                <Cell area="description">
                    <Grid gap="0" columns="1fr" rows="auto 1fr" className={classes.nodeDescriptionGrid} areas={["title", "description"]}>
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell key={key} area="title">
                                    <animated.div style={props}>
                                        <Typography variant={breakpoint.width > 1 ? "h2" : "h5"} className={classes.nodeDescriptionTitle}>
                                            {nodes[item].title}
                                        </Typography>
                                    </animated.div>
                                </Cell>
                            ))
                        }
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell key={item} area="description" className={classes.nodeDescriptionTextCell}>
                                    <animated.div style={props}>
                                        {
                                            nodes[item].description.map((t, idx2) =>
                                                <Typography key={idx2} variant={breakpoint.width > 1 ? "body1" : "body2"}
                                                    className={clsx({ 'typographyBody3': breakpoint.width <= 1 })}>
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
                <Cell area="projects" className={classes.projectsCell}>
                    <SwiperContainer swiperKey={selectedNode.toString()} currentSlide={currentSlide} handleSlideChange={handleSlideChange}
                        goNext={goNext} goPrev={goPrev}>
                        {
                            swiperItems.filter(s => s[swiperFilterKey].includes(nodes[selectedNode].title)).map((p, idx) => (
                                <SwiperItemComponent key={idx} project={p} closeRedirect={`${pagePath}/${nodes[selectedNode].key}`} />
                            ))
                        }
                    </SwiperContainer>
                </Cell>
            </Grid>
        </>
    );
}

export default PageTemplate;