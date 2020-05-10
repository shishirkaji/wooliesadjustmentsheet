import React from "react";
import {Link } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
const Header = ({ masterState,}) => {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adjustmentDate");
    localStorage.removeItem("user");
    localStorage.removeItem("position")

    
  };

  const loggedOut = () => {
    // console.log("oggedout");
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/" >Woolworths Adjustment Sheet</Navbar.Brand>
        
        <NavDropdown title="Action" id="nav-dropdown">
          <NavDropdown.Item onClick={logOut} eventKey="4.1" href="/">
            logout
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/" eventKey="4.4">
            Home
          </NavDropdown.Item>
          <NavDropdown.Divider />

          <NavDropdown.Item eventKey="4.1" href="/login">
            Dashboard
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    );
  };

  const loggedIn = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Woolworths Adjustment Sheet</Navbar.Brand>
        <NavDropdown title="Action" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1" href="/login">
            Login
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4" href="/">
            Home
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    );
  };
  // console.log(masterState.token)
  return <div>{masterState.token == null ? loggedIn() : loggedOut()}</div>;
};

export default Header;
