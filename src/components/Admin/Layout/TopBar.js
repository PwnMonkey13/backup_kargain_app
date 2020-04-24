import React, {useState} from "react"
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Plus, User, Mail, Bell, Menu } from 'react-feather'
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Badge, Hidden, IconButton, Toolbar} from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import theme from '../../../theme'
import clsx from 'clsx'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const TopBar = ({handleDrawerOpen, open, ...props}) => {
    const classes = useStyles();
    const {className, onClickTogglerNav, ...rest} = props;
    const [notifications] = useState([...Array(10)]);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            {...rest}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(
                        classes.menuButton, {
                        [classes.hide]: open,
                    })}>
                    <Menu/>
                </IconButton>
                <Link href="/admin">
                    <a>
                        <Typography className={classes.title} variant="h6" noWrap style={{color : theme.palette.white}}>
                            Kargain Admin
                        </Typography>
                    </a>
                </Link>
                <div style={{flexGrow: 1}}/>
                <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Mail/>
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show notifications" color="inherit">
                        <Badge badgeContent={notifications.length} color="secondary">
                            <Bell/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <User/>
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <Plus/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default TopBar;
