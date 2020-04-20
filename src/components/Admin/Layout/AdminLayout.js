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
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        // paddingLeft: 240
    },
    content: {
        height: '100%'
    }
}));

const AdminLayout = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <div className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
        })}>
            <TopBar onClickTogglerNav={handleSidebarToggle}/>
            <Sidebar
                onClose={handleSidebarToggle}
                open={openSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <Main className={classes.content}>
                {children}
            </Main>
        </div>
    );
};

const Main = ({children, ...props}) => {
    return(
        <main>
            {children}
        </main>
    )
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
