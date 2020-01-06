import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from "universal-cookie/cjs";
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
    Button,
    Form
} from 'reactstrap';
import AuthService from '../services/AuthService';
import { getLogo } from '../libs/functions';
import Link from "next/link";
// import { withTranslation } from '../../i18n'

const NavbarClient = ({t, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const router = useRouter();

    const handleSignoutSubmit = async (event) => {
        event.preventDefault();
        // Save current URL so user is redirected back here after signing out
        const cookies = new Cookies();
        cookies.set('redirect_url', window.location.pathname, { path: '/' });
        await router.push('/');
    };

    const navBar2 = () =>{
        if (props.session && props.session.user) {
            // If signed in display user dropdown menu
            const session = props.session;
            return (
                <Nav className="ml-auto" navbar>
                    {/*<!-- Uses .nojs-dropdown CSS to for a dropdown that works without client side JavaScript ->*/}
                    <div tabIndex="2" className="dropdown nojs-dropdown">
                        <div className="nav-item">
                            <span className="dropdown-toggle nav-link d-none d-md-block">
                                <span className="icon ion-md-contact" style={{fontSize: '2em', position: 'absolute', top: -5, left: -25}}/>
                            </span>
                            <span className="dropdown-toggle nav-link d-block d-md-none">
                                <span className="icon ion-md-contact mr-2">
                                    {session.user.name || session.user.email}
                                </span>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <Link prefetch href="/account">
                                <a className="dropdown-item">
                                    <span className="icon ion-md-person mr-1"> Your Account</span>
                                </a>
                            </Link>
                            <div className="dropdown-divider d-none d-md-block">
                                <div className="dropdown-item p-0">
                                    <Form id="signout" method="post" action="/auth/signout" onSubmit={handleSignoutSubmit}>
                                        <input name="_csrf" type="hidden" value={props.session.csrfToken}/>
                                        <Button type="submit" block className="pl-4 rounded-0 text-left dropdown-item">
                                            <span className="icon ion-md-log-out mr-1"> Sign out</span>
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Nav>
            )
        }
    };

    return (
        <header className="fixed-top">
            {/*<navBar2/>*/}
            <Navbar className="navbar navbar-expand-md pt-3 pb-3">
                <NavbarBrand className="nav" href="/">
                    <img src={getLogo()} style={{width:100, marginTop: -7}}  alt=""/>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className="btn btn-outline-primary" href="/announce-rental">Ajouter une annonce
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <FormGroup className='form-inline search-header-wrapper m-auto'>
                                <Input className="form-control" type="search" name="search" id="search" placeholder="Search" />
                            </FormGroup>
                        </NavItem>
                    </Nav>

                    <Nav className='rightNav ml-auto' navbar>
                        <NavItem>
                            <NavLink href="/account" className="navbar_icon">
                                <img src="/images/home.svg" alt=""/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="" className="navbar_icon navbar-icon-notifications">
                                <img src="/images/ring.svg" alt=""/>
                                {/*<NotificationPins/>*/}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="" className="navbar_icon">
                                <img src="/images/user.svg" alt=""/>
                            </NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            </Navbar>
        </header>
    );
};

// export default withTranslation('navbar')(NavbarClient);
export default NavbarClient;

