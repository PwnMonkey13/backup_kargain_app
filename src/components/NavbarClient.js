import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Input,
    Dropdown,
    DropdownItem,
} from 'reactstrap';
import {UserContext} from '../components/Context/UserContext';
import {getLogo} from '../libs/utils';

const NavbarClient = () => {
    const {session} = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        if (session.user) setAvatar(session.user.avatar);
    }, [session]);

    const DropdownUser = () => {
        return (
            <Dropdown className="dropdown-menu-right" isOpen={dropdownOpen} toggle={toggle} tag="div">
                <DropdownItem>
                    <NavLink tag="a" href={`/profile/${session.user.username}`}>Dashboard</NavLink>
                </DropdownItem>
                <DropdownItem>
                    <NavLink tag="a" href="/profile/edit">Edit Profile</NavLink>
                </DropdownItem>
                <DropdownItem>
                    <NavLink tag="a" href="/auth/logout">Log Out</NavLink>
                </DropdownItem>
            </Dropdown>
        )
    };

    return (
        <header className="header">
            <Navbar color="light" light expand="md">
                <NavbarBrand className="nav" href="/">
                    <img src={getLogo()} alt="logo"/>
                </NavbarBrand>

                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem className="px-3">
                            <NavLink className="btn btn-outline-primary cta_nav_link" href="/deposer-une-annonce">
                                Ajouter une annonce
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <FormGroup className='form-inline search-header-wrapper m-auto'>
                                <Input className="form-control" type="search" name="search" id="search"
                                       placeholder="Rechercher"/>
                            </FormGroup>
                        </NavItem>
                    </Nav>
                </Collapse>

                <Nav className="nav-right">
                    <NavbarToggler className="mr-2"/>
                    {session.isLoggedIn ?
                        <>
                            <NavItem onClick={(e) => setDropdownOpen(e)}>
                                {
                                    avatar && <img className="rounded-circle" width="40" height="40" src={avatar} alt="avatar"/>
                                }
                                <DropdownUser/>
                            </NavItem>

                            <NavItem className="navbar_icon navbar-icon-notifications">
                                <img width="25" height="25" src="/images/ring.svg" alt=""/>
                                {/*<NotificationPins/>*/}
                            </NavItem>
                        </> :
                        <>
                            <NavItem>
                                <NavLink tag="a" href="/auth/login">Connexion</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag="a" href="/auth/register">S'enregistrer</NavLink>
                            </NavItem>
                        </>
                    }
                </Nav>
            </Navbar>
        </header>
    );
};

export default NavbarClient;

