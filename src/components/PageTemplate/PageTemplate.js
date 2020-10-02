import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

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
        rows: "minmax(2em, auto) auto auto 1fr",
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

const PageTemplate = ({ nodes, swiperItems, swiperFilterKey, swiperItemComponent: SwiperItemComponent }) => {
    let breakpoint = useBreakpoint("index");

    let { data, setData } = useContext(backgroundDataContext);

    let [selectedNode, setSelectedNode] = useState(0);
    let [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);

    let classes = useStyles({ breakpointWidth: breakpoint.width });

    useEffect(() => {
        if (data.currentNodeIdx !== 0)
            setData({ currentNode: nodes[0], currentNodeIdx: 0 });
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

    const handleSlideChange = (e) => {
        setCurrentSlide(e.realIndex);
    }

    const goNext = () => {
        console.log(swiperRef.current)
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
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
                    <SwiperContainer swiperRef={swiperRef} swiperKey={selectedNode} currentSlide={currentSlide} handleSlideChange={handleSlideChange}
                        goNext={goNext} goPrev={goPrev}>
                        {
                            swiperItems.filter(s => s[swiperFilterKey].includes(nodes[selectedNode].title)).map((p, idx) => (
                                <div key={idx}>
                                    <SwiperItemComponent {...p} />
                                </div>
                            ))
                        }
                    </SwiperContainer>
                </Cell>
            </Grid>
        </>
    );
}

export default PageTemplate;