import React, { useRef, useState } from 'react';

import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';

import { Cell, Grid } from 'styled-css-grid';
import clsx from 'clsx';

import { animated, useTransition } from 'react-spring';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Swiper from "react-id-swiper";
import SwiperCore, { EffectCoverflow } from 'swiper';
import 'swiper/swiper.less';
import 'swiper/components/effect-coverflow/effect-coverflow.less';
import { projects } from '../../utils/projects';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
SwiperCore.use([EffectCoverflow]);

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
        // paddingTop: '1em',
        paddingRight: '2em',
        paddingLeft: '2em',
        textAlign: 'center',
        color: 'white',
    },
    nodeDescriptionTitle: {
        paddingBottom: '0.5em',
    },
    swiperContainer: {
        height: '18em',
    },
    swiperControlsGrid: {
        paddingTop: '2em',
    },
    swiperControlsRoot: {
        color: 'white',
        backgroundColor: '#ffffff4d',
        '&:disabled': {
            opacity: '0.3',
            color: 'white',
            backgroundColor: '#ffffff4d',
        }
    },
}));

const swiperParams = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.3,
    coverflowEffect: {
        rotate: -30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    spaceBetween: 5,
};

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
    let [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);

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
            <div className={classes.backgroundDiv} />
            <Grid gap="0" columns="1fr" rows="auto 16em 1fr" areas={["nodes", "description", "projects"]}>
                <Cell area="nodes">
                    <Grid className={classes.nodesGrid} gap="0" columns="repeat(4, auto-fit)" rows="1fr" areas={["React NodeJS Express MongoDB"]}>
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
                    <Swiper
                        ref={swiperRef}
                        initialSlide={0}
                        containerClass={clsx('swiper-container', classes.swiperContainer)}
                        {...swiperParams}
                        on={{
                            slideChange: handleSlideChange
                        }}
                    >
                        {
                            projects.map((p, idx) => (
                                <div key={idx}>
                                    <ProjectListItem {...p} />
                                </div>
                            ))
                        }
                    </Swiper>
                    <Grid columnGap="1em" rows="1fr" columns="1fr auto auto 1fr" areas={['. left right .']} className={classes.swiperControlsGrid}>
                        <Cell area="left">
                            <IconButton disabled={currentSlide === 0} classes={{ root: classes.swiperControlsRoot }} onClick={goPrev}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Cell>
                        <Cell area="right">
                            <IconButton disabled={currentSlide === projects.length - 1} classes={{ root: classes.swiperControlsRoot }} onClick={goNext}>
                                <ChevronRightIcon />
                            </IconButton>
                        </Cell>
                    </Grid>
                </Cell>
            </Grid>
        </>
    );
}

export default Technologies;