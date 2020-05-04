import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Collapse, Dropdown, DropdownItem, FormGroup, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import FaceIcon from '@material-ui/icons/Face'
import Badge from '@material-ui/core/Badge'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { UserContext } from '../context/UserContext'
import { getLogo } from '../libs/utils'
import User from '../class/user.class';

const NavbarClient = () => {
    const { session } = useContext(UserContext)
    const user = new User(session.user)
    const [collapsed, setCollapsed] = useState(false)
    const toggleNavbar = () => setCollapsed(!collapsed)

    const LoggedInUserNav = () => {
        const [state, setState] = useState({
            isOpen1 : false,
            isOpen2 : false
        });

        const toggle = (toggled) =>{
            setState(state => ({
                ... Object.keys(state)
                    .filter(key => key !== toggled)
                    .reduce((carry, key) => ({ ...carry, [key] : false}),state),
                [toggled] : !state[toggled]
            }));
        }

        const DropdownNotifs = ({isOpen, keyName, toggle}) => {
            return(
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
                        <div id="dropdown-notifications" className={clsx("dropdown-menu",isOpen && "show")}
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
            )
        }

        const DropdownUser = ({isOpen, keyName, toggle}) => {
            return(
                <li className="nav-item navbar-dropdown p-2" data-dropdown="dropdownUser">
                    {user.getAvatar &&
                    <img className="dropdown-toggler rounded-circle"
                         width="40"
                         height="40"
                         src={user.getAvatar}
                         alt="avatar"
                         onClick={() => toggle(keyName)}
                    />}
                    <ul className={clsx("dropdown", isOpen && "show")} id="dropdownUser" >
                        <li className="px-0 dropdown-item">
                            <Link href={`/profile/${session.user.username}`} prefetch={false}>
                                <a className="nav-link text-left"><FaceIcon/><span className="m-1">Mon profil</span></a>
                            </Link>
                        </li>
                        <li className="px-0 dropdown-item">
                            <Link href="/profile/edit" prefetch={false}>
                                <a className="nav-link text-left"><SettingsIcon/> <span className="m-1">Préférences</span></a>
                            </Link>
                        </li>
                        <li className="px-0 dropdown-item">
                            <Link href="/auth/logout" prefetch={false}>
                                <a className="nav-link text-left"><ExitToAppIcon/><span className="m-1">Déconnection</span></a>
                            </Link>
                        </li>
                    </ul>
                </li>
            )
        }

        return (
            <Nav navbar>
               <DropdownNotifs isOpen={state.isOpen1} keyName="isOpen1" toggle={toggle}/>
               <DropdownUser isOpen={state.isOpen2} keyName="isOpen2" toggle={toggle}/>
            </Nav>
        )
    }

    const VisitorNav = () => (
        <Nav navbar>
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
            <NavItem className="p-2">
                <Link href="/admin" prefetch={false}>
                    <a className="nav-link">Admin</a>
                </Link>
            </NavItem>
        </Nav>
    )

    return (
        <header className="header bg-light">
            <Navbar light expand="md" className="navbar p-2 position-relative">
                <NavbarBrand href="/">
                    <img src={getLogo()} width="150" alt="logo"/>
                </NavbarBrand>

                <div className="d-flex navbar-menu" id="open-navbar1">
                    <Collapse isOpen={collapsed} navbar>
                        <Nav navbar style={{ flex : 1 }}>
                            <NavItem className="p-2">
                                <Link href="/deposer-une-annonce" prefetch={false}>
                                    <a className="btn btn-outline-primary cta_nav_link">
                                        Ajouter une annonce
                                    </a>
                                </Link>
                            </NavItem>
                            <NavItem className="p-2">
                                <FormGroup className='form-inline search-header-wrapper m-auto'>
                                    <Input className="form-control" type="search" name="search" id="search"
                                           placeholder="Rechercher"/>
                                </FormGroup>
                            </NavItem>
                        </Nav>

                        <Nav navbar>
                            {session.isLoggedIn ? <LoggedInUserNav/> : <VisitorNav/>}
                        </Nav>

                    </Collapse>

                    <NavbarToggler
                        className="mr-2"
                        style={{ position: 'absolute', top: "10px", right: 0 }}
                        onClick={toggleNavbar}
                    />
                </div>
            </Navbar>
        </header>
    )
}

export default NavbarClient
