import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import { Collapse, Container, FormGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { useTheme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ChatIcon from '@material-ui/icons/Chat';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FaceIcon from '@material-ui/icons/Face';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getLogo } from '../libs/utils';
import { useAuth } from '../context/AuthProvider';
import DropdownSwitchLang from './Locales/DropdownSwitchLang';
import CTALink from './CTALink';

const useStyles = makeStyles(theme => ({
    navBarClient: {
        display: 'flex',
        flex: 1,
        width: 'min-content',
    },

    inputSearch: {
        width: '300px',

        [theme.breakpoints.down('md')]: {
            width: 'unset',
        },
    },
}));

const NavbarClient = () => {
    const { isAuthenticated } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header className="header">
            <Container>
                <Navbar light expand="md" className="navbar p-2 position-relative">
                    <NavbarBrand href="/">
                        <img src={getLogo()} width="150" alt="logo"/>
                    </NavbarBrand>
                    <NavbarAction/>
                    <div className="d-flex navbar-menu" id="open-navbar1">

                        <Collapse isOpen={collapsed} navbar>
                            {isAuthenticated ?
                                <LoggedInUserNav/> :
                                <VisitorNav/>
                            }
                        </Collapse>

                        <NavbarToggler
                            className="m-2"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: 0,
                            }}
                            onClick={toggleNavbar}
                        />
                    </div>
                </Navbar>
            </Container>
        </header>
    );
};

const NewAdButtonCTA = () => {
    const { t } = useTranslation();
    return (
        <CTALink
            title={t('layout:create-announce')}
            href="/deposer-une-annonce"
            className="cta_nav_link"
        />
    );
};

const NavbarAction = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <Nav className={clsx(!isDesktop && 'd-inline-block', 'my-2')}>
            {isDesktop && (
                <NavItem className="p-2">
                    <NewAdButtonCTA/>
                </NavItem>
            )}

            <NavItem className="p-2">
                <form method="GET" action="/search">

                    <FormGroup className="form-inline search-header-wrapper m-auto position-relative">
                        <input
                            name="query"
                            type="search"
                            placeholder={t('layout:search')}
                            className={clsx('form-control', classes.inputSearch)}
                            id="search_input"
                        />

                        <div className="feedback-icon">
                            <SearchIcon/>
                        </div>

                        <input
                            type="submit"
                            tabIndex="-1"
                            style={{
                                position: 'absolute',
                                left: '-9999px',
                                width: '1px',
                                height: '1px',
                            }}
                        />
                    </FormGroup>
                </form>
            </NavItem>
        </Nav>
    );
};

const DropdownNotifs = ({ isOpen, keyName, toggle }) => {
    return (
        <li className="nav-item p-2 navbar_icon navbar-icon-notifications">
            <div className="dropdown show">
                <IconButton color="inherit"
                            data-toggle="dropdown-notifications"
                            aria-haspopup="true"
                            aria-expanded="true"
                            id="dropdownMenu2"
                            onClick={() => toggle(keyName)}>
                    <Badge badgeContent={1} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <div id="dropdown-notifications" className={clsx('dropdown-menu', isOpen && 'show')}
                     aria-labelledby="dropdownMenu2">
                    <div className="notf-wrapper">
                        <div>
                            <div className="text-podpiska">
                                <span>You are welcome on Kargain</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

const DropdownUser = ({ isOpen, keyName, toggle }) => {
    const { authenticatedUser, logout } = useAuth();
    const { t } = useTranslation();

    return (
        <li className="nav-item navbar-dropdown p-2" data-dropdown="dropdownUser">
            <span className="dropdown-toggler rounded-circle" onClick={() => toggle(keyName)}>
                <PermIdentityIcon/>
            </span>

            <ul className={clsx('dropdown', isOpen && 'show')} id="dropdownUser">
                {authenticatedUser.isAdmin && (
                    <li className="px-0 dropdown-item">
                        <Link href={`/admin`} prefetch={false}>
                            <a className="nav-link text-left"><DashboardIcon/><span className="m-1">Admin</span></a>
                        </Link>
                    </li>
                )}
                <li className="px-0 dropdown-item">
                    <Link href={authenticatedUser.getProfileLink} prefetch={false}>
                        <a className="nav-link text-left"><FaceIcon/>
                            <span className="m-1">
                                {t('layout:my-profile')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="/profile/messages" prefetch={false}>
                        <a className="nav-link text-left"><ChatIcon/>
                            <span className="m-1">
                                 {t('layout:messaging')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href={authenticatedUser.getProfileEditLink} prefetch={false}>
                        <a className="nav-link text-left"><SettingsIcon/>
                            <span className="m-1">
                                 {t('layout:settings')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="" prefetch={false}>
                        <a className="nav-link text-left" onClick={() => logout()}>
                            <ExitToAppIcon/>
                            <span className="m-1">
                          {t('layout:logout')}
                        </span>
                        </a>
                    </Link>
                </li>
            </ul>
        </li>
    );
};

const LoggedInUserNav = () => {
    const [state, setState] = useState({
        isOpen1: false,
        isOpen2: false,
    });

    const toggle = (toggled) => {
        setState(state => ({
            ...Object.keys(state)
                .filter(key => key !== toggled)
                .reduce((carry, key) => ({
                    ...carry,
                    [key]: false,
                }), state),
            [toggled]: !state[toggled],
        }));
    };

    return (
        <Nav navbar className="flex-row-nav my-2">
            <DropdownSwitchLang/>
            <DropdownNotifs isOpen={state.isOpen1} keyName="isOpen1" toggle={toggle}/>
            <DropdownUser isOpen={state.isOpen2} keyName="isOpen2" toggle={toggle}/>
        </Nav>
    );
};

const VisitorNav = () => {
    const { t } = useTranslation();

    return (
        <Nav navbar className="flex-row-nav">
            <DropdownSwitchLang/>
            <NavItem className="p-2">
                <Link href="/auth/login" prefetch={false}>
                    <a className="nav-link">
                        {t('layout:login')}
                    </a>
                </Link>
            </NavItem>
            <NavItem className="p-2">
                <Link href="/auth/register" prefetch={false}>
                    <a className="nav-link">
                        {t('layout:register')}
                    </a>
                </Link>
            </NavItem>
        </Nav>
    );
};

export default NavbarClient;
