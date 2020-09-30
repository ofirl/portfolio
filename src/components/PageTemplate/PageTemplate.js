import React, { useRef, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { Cell, Grid } from 'styled-css-grid';

import { animated, useTransition } from 'react-spring';

import NodeMenu from './components/NodeMenu/NodeMenu';
import SwiperContainer from './components/SwiperContainer/SwiperContainer';

const useStyles = makeStyles(theme => ({
    nodeDescriptionGrid: {
        paddingRight: '2em',
        paddingLeft: '2em',
        textAlign: 'center',
        color: 'white',
    },
    nodeDescriptionTitle: {
        paddingBottom: '0.5em',
    }
}));

const PageTemplate = ({ nodes, swiperItems, swiperItemComponent: SwiperItemComponent }) => {
    let [selectedNode, setSelectedNode] = useState(0);
    let [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);

    let classes = useStyles();

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

    const handleSlideChange = (e) => {
        setCurrentSlide(e.realIndex);
    }

    const goNext = () => {
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
            <Grid gap="0" columns="1fr" rows="auto 10em 1fr" areas={["nodes", "description", "projects"]}>
                <Cell area="nodes">
                    <NodeMenu nodes={nodes} handleNodeClick={handleNodeClick} selectedNode={selectedNode} />
                </Cell>
                <Cell area="description">
                    <Grid gap="0" columns="1fr" rows="auto 1fr" className={classes.nodeDescriptionGrid} areas={["title", "description"]}>
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell key={item} className="posRelative" area="title">
                                    <animated.div style={props}>
                                        <Typography variant="h5" className={classes.nodeDescriptionTitle}>
                                            {nodes[item].title}
                                        </Typography>
                                    </animated.div>
                                </Cell>
                            ))
                        }
                        {
                            nodeDescriptionTransitions.map(({ item, key, props }) => (
                                <Cell key={item} className="posRelative" area="description">
                                    <animated.div style={props}>
                                        {
                                            nodes[item].description.map((t, idx2) =>
                                                <Typography key={idx2} variant="body2">
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
                <Cell area="projects">
                    <SwiperContainer swiperRef={swiperRef} currentSlide={currentSlide} handleSlideChange={handleSlideChange} goNext={goNext} goPrev={goPrev}>
                        {
                            swiperItems.map((p, idx) => (
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