import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar expand="sm" color="dark" dark>
                <NavbarToggler onClick={toggleOpen} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="m-auto" navbar>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/management"
                                className={location.pathname === "/management" ? "text-primary" : ""}
                            >
                                Management
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/payment"
                                className={location.pathname === "/payment" ? "text-primary" : ""}
                            >
                                Payment
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Header;
