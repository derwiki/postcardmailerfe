import React, { useContext, useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import UserContext from "./UserComponent";

function NavbarComponent(props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const user = useContext(UserContext);
    const { isAuthenticated } = props;
    console.log("NavbarComponent user", user)

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    <img src="/favicon-32x32.png" alt="Postcard clipart" className="pr-3" />
                    Postcard Mailer
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {!isAuthenticated && (
                            <NavItem>
                                <NavLink href="#">Sign in</NavLink>
                            </NavItem>
                        )}
                        {!isAuthenticated && (
                            <NavItem>
                                <NavLink href="#">Sign out</NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent