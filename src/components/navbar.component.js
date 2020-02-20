import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

import logo from "../logo.png";

export default class NavbarMain extends Component {

  render() {
    return (

      <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="200"
                height="40"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {/* <Nav.Link href="/">Home</Nav.Link> */}
                <NavDropdown title="Elements" id="element-dropdown">
                  <NavDropdown.Item href="/elements/create">Create Element</NavDropdown.Item>
                  <NavDropdown.Item href="/elements">Manage Elements</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Tracks" id="track-dropdown">
                  <NavDropdown.Item href="/tracks/create">Create Track</NavDropdown.Item>
                  <NavDropdown.Item href="/tracks">Manage Tracks</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1"disabled>Create Program</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2"disabled>Edit Program</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3"disabled>View Program</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </Container> 
    );
  }
}