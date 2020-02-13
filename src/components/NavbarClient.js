import React, {useState, useEffect, useContext} from 'react';
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
    DropdownItem,
} from 'reactstrap';
import {UserContext} from '../components/Context/UserContext';
import {getLogo} from '../libs/functions';

const NavbarClient = () => {
    const {session} = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const toggleOpen = (e) => {
        setOpen(!open);
    };

    useEffect(() => {
        if (session.user) setAvatar(session.user.avatar);
    }, [session]);

    const DropdownUser = () => {
        const menuClass = `dropdown-menu${open ? " show" : ""}`;
        return (
            <div className={menuClass} aria-labelledby="navbarDropdownMenuLink">
                <DropdownItem>
                    <NavLink tag="a" href={`/profile/${session.user.username}`}>Dashboard</NavLink>
                </DropdownItem>
                <DropdownItem>
                    <NavLink tag="a" href="/profile/edit">Edit Profile</NavLink>
                </DropdownItem>
                <DropdownItem>
                    <NavLink tag="a" href="/auth/logout">Log Out</NavLink>
                </DropdownItem>
            </div>
        )
    };

    return (
        <header className="fixed-top">
            <Navbar color="light" light expand="md">
                <NavbarBrand className="nav" href="/">
                    <img src={getLogo()} style={{width: 100, marginTop: -7}} alt="logo"/>
                </NavbarBrand>

                <Nav className="nav-right">
                    <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                    {session.isLoggedIn ?
                        <>
                            <NavItem className="dropdown-toggle" onClick={(e) => toggleOpen(e)}>
                                {avatar &&
                                <img className="rounded-circle" width="40" height="40" src={avatar} alt="avatar"/>
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
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem className="px-3">
                            <NavLink className="btn btn-outline-primary cta_nav_link" href="/announce-rental">
                                Ajouter une annonce
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <FormGroup className='form-inline search-header-wrapper m-auto'>
                                <Input className="form-control" type="search" name="search" id="search"
                                       placeholder="Search"/>
                            </FormGroup>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavbarClient;

