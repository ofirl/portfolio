import React, { useCallback, useState } from 'react';

import { Cell, Grid } from 'styled-css-grid';
import clsx from 'clsx';

import { AppBar, Dialog, IconButton, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import ReactBnbGallery from 'react-bnb-gallery';

import { Spring } from 'react-spring/renderprops';

import useBreakpoint from '../../customHooks/useBreakPoint';

import 'react-bnb-gallery/dist/style.css'

const useStyles = makeStyles(theme => ({
    dialogRoot: {
        height: '100%',
        width: '100%',
        display: 'grid',
        justifyItems: 'center',
        backgroundColor: '#333',
    },
    mainPaper: {
        width: '100%',
        maxWidth: '50em',
        backgroundColor: '#333',
        paddingBottom: '2em',
        boxShadow: '0px 2px 1px -1px rgba(255, 255, 255, 0.8),0px 1px 1px 0px rgba(0,0,0,0.56),0px 1px 3px 0px rgba(255, 255, 255, 0.48)',
        color: 'white',
    },
    dialogAppBarRoot: {
        backgroundColor: '#333',
    },
    disableBoxShadow: {
        boxShadow: 'none',
    },
    toolbarRoot: {
        minHeight: '4em',
    },
    projectLogo: {
        position: 'absolute',
        zIndex: '1200',
    },
    projectTitle: {
        position: 'absolute',
        zIndex: '1200',
    },
    projectTechnologies: {
        position: 'absolute',
        right: '1em',
        zIndex: '1200',
        textAlign: 'right',
    },
    detailsContentGrid: {
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
    },
    detailHighlight: {
        backgroundColor: ({ highlight }) => highlight,
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        paddingRight: '1em',
        paddingLeft: '1em',
    }
}));

const detailComponents = {
    Header: ({ value, highlight }) => {
        let classes = useStyles({ highlight });

        return (
            <Typography variant="h6" className={classes.detailHighlight}>
                {value}
            </Typography>
        );
    },
    Text: ({ value, highlight }) => {
        let classes = useStyles({ highlight });

        return (
            <Typography variant="body2" className={classes.detailHighlight}>
                {
                    typeof (value) === "string" ?
                        value
                        :
                        value.map((v, idx) => (
                            <React.Fragment key={idx}>
                                {v}
                                <br />
                            </React.Fragment>
                        ))
                }
            </Typography >
        );
    },
    List: ({ value, title, highlight }) => {
        let classes = useStyles({ highlight });

        return (
            <div className={classes.detailHighlight}>
                {
                    title &&
                    <Typography variant="body2">
                        {title}
                    </Typography>
                }
                <ul>
                    {
                        value.map((v, idx) => (
                            <li key={idx}>
                                <Typography variant="body2">
                                    {v}
                                </Typography>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    },
    Gallery: ({ value, size, direction, projectTitle }) => {
        const [currentImage, setCurrentImage] = useState(0);
        const [viewerIsOpen, setViewerIsOpen] = useState(false);

        const openLightbox = useCallback((event, { photo, index }) => {
            setCurrentImage(index);
            setViewerIsOpen(true);
        }, []);

        const closeLightbox = () => {
            setCurrentImage(0);
            setViewerIsOpen(false);
        };

        const photos = value.map(v => ({
            height: 1,
            width: 1,
            ...v,
            src: `/assets/images/projects/${projectTitle}/${v.src}`,
            photo: `/assets/images/projects/${projectTitle}/${v.src}`,
        }));

        return (
            <>
                <Gallery photos={photos} onClick={openLightbox} />
                <ReactBnbGallery
                    show={viewerIsOpen}
                    photos={photos}
                    onClose={closeLightbox}
                />
                {/* <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={value.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway> */}
            </>
        );
    },
}

const ProjectDetails = ({ open, project, onClose }) => {
    let { width: breakpointWidth } = useBreakpoint("index");

    let [headerStyle, setHeaderStyle] = useState({
        scrollPosition: 0,
        logo: {
            top: '4em',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '10em',
            width: '10em',
        },
        title: {
            top: '4.5em',
            left: '0.5em',
            fontSize: '3rem',
        },
        technologies: {
            top: breakpointWidth === 0 ? '18em' : '16em',
            opacity: '1',
        }
    });

    const updateStyle = (scrollPos) => {
        let effectiveScrollPositionY = scrollPos;
        if (scrollPos > 200)
            effectiveScrollPositionY = 200;

        let newCalculatedStyle = {};

        const calcStyle = (min, max, units) => `${min + (max - min) * (1 - effectiveScrollPositionY / 200)}${units}`

        newCalculatedStyle.scrollPosition = scrollPos;

        newCalculatedStyle.logo = {
            top: calcStyle(0.5, 4, "em"),
            left: calcStyle(0, 50, "%"),
            transform: `translateX(${calcStyle(125, -50, "%")})`,
            height: calcStyle(3, 10, "em"),
            width: calcStyle(3, 10, "em"),
        };

        newCalculatedStyle.title = {
            top: calcStyle(1.25, 4.5, "em"),
            left: calcStyle(7.5, 0.5, "em"),
            fontSize: calcStyle(1, 3, "rem"),
        };

        newCalculatedStyle.technologies = {
            top: calcStyle(1.25, breakpointWidth === 0 ? 18 : 16, "em"),
            opacity: calcStyle(-1, 1, "")
        };

        setHeaderStyle(newCalculatedStyle);
    };

    let classes = useStyles();

    return (
        <Dialog onScroll={(e) => updateStyle(e.target.scrollTop)} fullScreen open={open} onClose={onClose} classes={{ paper: classes.dialogRoot }}>
            <Paper classes={{ root: classes.mainPaper }}>
                <AppBar position="sticky" classes={{ root: clsx(classes.dialogAppBarRoot, { [classes.disableBoxShadow]: headerStyle.scrollPosition < 200 }) }}>
                    <Toolbar classes={{ root: classes.toolbarRoot }}>
                        <IconButton edge="start" color="inherit" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <Spring to={headerStyle.technologies}>
                        {
                            (TechnologiesStyleAnimated) =>
                                <div className={classes.projectTechnologies} style={{ ...TechnologiesStyleAnimated }}>
                                    <Typography variant="subtitle1">
                                        Technologies
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {project.technologies.join(" | ")}
                                    </Typography>
                                </div>
                        }
                    </Spring>
                    <Spring to={headerStyle.title}>
                        {
                            (titleStyleAnimated) =>
                                <Typography variant="h6" className={classes.projectTitle} style={{ ...titleStyleAnimated }}>
                                    {project.title}
                                </Typography>
                        }
                    </Spring>
                    <Spring to={headerStyle.logo}>
                        {
                            (logoStyleAnimated) =>
                                <img src={`/assets/images/projects/${project.title}.png`} alt={`${project.title}-logo`} style={{ ...logoStyleAnimated }} className={classes.projectLogo} />
                        }
                    </Spring>
                </AppBar>
                <Grid gap="0" columns="1fr" rows={breakpointWidth === 0 ? "19em" : "16em"} className={classes.detailsContentGrid}>
                    <Cell />
                    {
                        project.description.map(({ type, ...others }, idx) => {
                            let Comp = detailComponents[type];
                            return <Comp key={idx} projectTitle={project.title} {...others} />;
                        })
                    }
                </Grid>
            </Paper>
        </Dialog>
    );
}

export default ProjectDetails;