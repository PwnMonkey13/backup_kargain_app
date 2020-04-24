import React, {useState} from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles, useTheme} from "@material-ui/styles";
import {Grid, useMediaQuery} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    shiftContent: {
        // paddingLeft: 240
    },
    content: {
        width: '95%',
        height: '100%'
    }
}));

const AdminLayout = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <TopBar handleDrawerOpen={handleDrawerToggle}/>
            <main className="d-flex">
                <Sidebar
                    onClose={handleDrawerClose}
                    open={open}
                    variant={isDesktop ? 'persistent' : 'temporary'}
                />
                <section className={classes.content}>
                    {children}
                </section>
            </main>
        </div>
    );
};

const BreadCrumb = () => {
    return(
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                Material-UI
            </Link>
            <Link color="inherit" href="/getting-started/installation/">
                Core
            </Link>
            <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                aria-current="page"
            >
                Breadcrumb
            </Link>
        </Breadcrumbs>
    )
};

export default AdminLayout;
