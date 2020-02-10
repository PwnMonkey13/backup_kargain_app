import React, {useState, useContext} from 'react';
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
    DropdownMenu,
} from 'reactstrap';
import {UserContext} from '../components/Context/UserContext';
import {getLogo} from '../libs/functions';

const NavbarClient = ({loggedInUser, ...props}) => {
    const {session } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const getSessionAvatar = () => {
        return loggedInUser.avatar || '/images/profile.png';
    };

    return (
        <header className="fixed-top">
            <Navbar color="light" light expand="md">
                <NavbarBrand className="nav" href="/">
                    <img src={getLogo()} style={{width: 100, marginTop: -7}} alt="logo"/>
                </NavbarBrand>

                <Nav className="nav-right">
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    { loggedInUser &&
                    <>
                        <NavItem className="dropdown dropdown-toggle"
                             id="navbarDropdownMenuLink"
                             role="button"
                             data-toggle="dropdown"
                             aria-haspopup="true"
                             aria-expanded="false">

                            <img className="rounded-circle" width="40" height="40" src={getSessionAvatar()} alt="avatar"/>

                            <DropdownMenu tag="ul" aria-labelledby="navbarDropdownMenuLink">
                                <NavItem>
                                    <NavLink href="/profile"> Dashboard </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/profile/edit"> Edit Profile </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/auth/logout"> Log Out </NavLink>
                                </NavItem>
                            </DropdownMenu>
                        </NavItem>

                        <NavItem className="navbar_icon navbar-icon-notifications">
                            <img width="25" height="25" src="/images/ring.svg" alt=""/>
                            {/*<NotificationPins/>*/}
                        </NavItem>
                    </> }
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
                                <Input className="form-control" type="search" name="search" id="search" placeholder="Search"/>
                            </FormGroup>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
};

// export default withTranslation('navbar')(NavbarClient);
export default NavbarClient;

