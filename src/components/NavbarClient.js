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

    const NavBarRight = () => {
        return(
            <Nav navbar className="nav-right">
                {session.isLoggedIn ?
                    <>
                        <NavItem className="p-2" onClick={(e) => setDropdownOpen(e)}>
                            {
                                avatar && <img className="rounded-circle" width="40" height="40" src={avatar} alt="avatar"/>
                            }
                            <DropdownUser/>
                        </NavItem>

                        <NavItem className="p-2 navbar_icon navbar-icon-notifications">
                            <img width="25" height="25" src="/images/ring.svg" alt=""/>
                            {/*<NotificationPins/>*/}
                        </NavItem>
                    </> :
                    <>
                        <NavItem className="p-2">
                            <NavLink tag="a" href="/auth/login">Connexion</NavLink>
                        </NavItem>
                        <NavItem className="p-2">
                            <NavLink tag="a" href="/auth/register">S'enregistrer</NavLink>
                        </NavItem>
                    </>
                }
            </Nav>
        )
    };

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
        <header className="header bg-light">
            <Navbar light expand="md" className="my-2 px-0 position-relative">
                <NavbarBrand className="nav" href="/">
                    <img src={getLogo()} alt="logo"/>
                </NavbarBrand>

                <Collapse isOpen={collapsed} navbar>
                    <Nav navbar>
                        <NavItem className="p-2">
                            <NavLink className="btn btn-outline-primary cta_nav_link" href="/deposer-une-annonce">
                                Ajouter une annonce
                            </NavLink>
                        </NavItem>
                        <NavItem className="p-2">
                            <FormGroup className='form-inline search-header-wrapper m-auto'>
                                <Input className="form-control" type="search" name="search" id="search"
                                       placeholder="Rechercher"/>
                            </FormGroup>
                        </NavItem>
                    </Nav>
                    <NavBarRight/>
                </Collapse>
                <div>
                    <NavbarToggler style={{position:'absolute', top:0,right:0}} onClick={toggleNavbar} className="mr-2" />
                </div>
            </Navbar>
        </header>
    );
};

export default NavbarClient;

