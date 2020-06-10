import React, { useState } from 'react';
import Link from 'next-translate/Link';
import clsx from 'clsx';
import { Collapse, FormGroup, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation';
import { getLogo } from '../libs/utils';
import { useAuth } from '../context/AuthProvider';
import DropdownSwitchLang from './Locales/DropdownSwitchLang';
import CTALink from './CTALink';

const NavbarClient = () => {
    const { isAuthenticated } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const theme = useTheme();
    const { t, lang } = useTranslation();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
    console.log('lang in navbar');
    console.log(lang);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header className="header bg-light">
            <Navbar light expand="md" className="navbar p-2 position-relative">
                <NavbarBrand href="/">
                    <img src={getLogo()} width="150" alt="logo"/>
                </NavbarBrand>

                { !isDesktop && (
                    <div style={{ display : 'contents'}}>
                        <NewAdButtonCTA/>
                    </div>
                )}

                <div className="d-flex navbar-menu" id="open-navbar1">
                    <Collapse isOpen={collapsed} navbar>
                        <NavbarAction/>
                        {isAuthenticated ?
                            <LoggedInUserNav/> :
                            <VisitorNav/>
                        }

                    </Collapse>

                    <NavbarToggler
                        className="mr-2"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: 0,
                        }}
                        onClick={toggleNavbar}
                    />
                </div>
            </Navbar>
        </header>
    );
};

const NewAdButtonCTA = () => {
    const { t, lang } = useTranslation();
    return(
        <>
            {lang === 'fr' ? (
                <CTALink
                    title="Ajouter une annonce"
                    href="/deposer-une-annonce"
                    className="cta_nav_link"
                />
            ) : (
                <CTALink
                    title="Create an announce"
                    href="/deposer-une-annonce"
                    className="cta_nav_link"
                />
            )}
        </>
    )
}
const NavbarAction = () => {
    const theme = useTheme();
    const { t, lang } = useTranslation();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return(
        <Nav navbar style={{ flex: 1 }}>
            {isDesktop && (
                <NavItem className="p-2">
                    <NewAdButtonCTA/>
                </NavItem>
            )}

            <NavItem className="p-2">
                <form method="GET" action="/search">
                    <FormGroup className='form-inline search-header-wrapper m-auto'>
                        <Input
                            className="form-control"
                            type="search"
                            name="query"
                            id="search"
                            placeholder={lang === 'fr' ? 'Rechercher' : 'Search'}/>
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
    )
}

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
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <div id="dropdown-notifications" className={clsx('dropdown-menu', isOpen && 'show')}
                     aria-labelledby="dropdownMenu2">
                    <div className="notf-wrapper">
                        <div>
                            <img
                                src="https://scontent-frt3-2.cdninstagram.com/vp/b38b4e6ec980b4e0d975ae00438a9990/5CAE7F88/t51.2885-19/s150x150/27580324_1961241000859897_4541351977585475584_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com"
                                alt=""/>
                            <div className="text-podpiska"><span>kaleriya_volk</span> подписался(-ась) на вас.
                            </div>
                        </div>
                        <a className="btn btn-primary subscribe-btn" href="#">Subscribe</a>
                    </div>
                    <div className="notf-wrapper">
                        <div>
                            <img
                                src="https://scontent-frt3-2.cdninstagram.com/vp/b38b4e6ec980b4e0d975ae00438a9990/5CAE7F88/t51.2885-19/s150x150/27580324_1961241000859897_4541351977585475584_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com"
                                alt=""/>
                            <div className="text-podpiska"><span>kaleriya_volk</span> поставил лайк Вашему
                                объявлению
                            </div>
                        </div>
                    </div>
                    <div className="notf-wrapper">
                        <div>
                            <img
                                src="https://scontent-frt3-2.cdninstagram.com/vp/b38b4e6ec980b4e0d975ae00438a9990/5CAE7F88/t51.2885-19/s150x150/27580324_1961241000859897_4541351977585475584_n.jpg?_nc_ht=scontent-frt3-2.cdninstagram.com"
                                alt=""/>
                            <div className="text-podpiska"><span>kaleriya_volk</span> оставил комментарий Вашему
                                объявлению с каким-то названием
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

const DropdownUser = ({ isOpen, keyName, toggle }) => {
    const { authenticatedUser } = useAuth();
    const { t, lang } = useTranslation();
    return (
        <li className="nav-item navbar-dropdown p-2" data-dropdown="dropdownUser">
            {authenticatedUser.getAvatar &&
            <img className="dropdown-toggler rounded-circle"
                 width="40"
                 height="40"
                 src={authenticatedUser.getAvatar}
                 alt="avatar"
                 onClick={() => toggle(keyName)}
            />}

            <ul className={clsx('dropdown', isOpen && 'show')} id="dropdownUser">
                {authenticatedUser.isAdmin && (
                    <li className="px-0 dropdown-item">
                        <Link href={`/admin`} prefetch={false}>
                            <a className="nav-link text-left"><DashboardIcon/><span className="m-1">Admin</span></a>
                        </Link>
                    </li>
                )}
                <li className="px-0 dropdown-item">
                    <Link href={`/profile/${authenticatedUser.getUsername}`} prefetch={false}>
                        <a className="nav-link text-left"><FaceIcon/>
                            <span className="m-1">
                                {lang === 'fr' ? 'Mon profil' : 'My profile'}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="/profile/edit" prefetch={false}>
                        <a className="nav-link text-left"><SettingsIcon/>
                            <span className="m-1">
                                 {lang === 'fr' ? 'Paramétres' : 'Settings'}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="/auth/logout" prefetch={false}>
                        <a className="nav-link text-left"><ExitToAppIcon/>
                            <span className="m-1">
                                  {lang === 'fr' ? 'Déconnexion' : 'Logout'}
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
        <Nav navbar className="flex-row-nav">
            <DropdownSwitchLang/>
            <DropdownNotifs isOpen={state.isOpen1} keyName="isOpen1" toggle={toggle}/>
            <DropdownUser isOpen={state.isOpen2} keyName="isOpen2" toggle={toggle}/>
        </Nav>
    );
};

const VisitorNav = () => {
    return (
        <Nav navbar className="flex-row-nav">
            <DropdownSwitchLang/>
            <NavItem className="p-2">
                <Link href="/auth/login" prefetch={false}>
                    <a className="nav-link">Connexion</a>
                </Link>
            </NavItem>
            <NavItem className="p-2">
                <Link href="/auth/register" prefetch={false}>
                    <a className="nav-link">S'enregistrer</a>
                </Link>
            </NavItem>
        </Nav>
    );
};

export default NavbarClient;
