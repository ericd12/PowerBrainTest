import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

import logo from "../logo.png";

export default class NavbarMain extends Component {

  render() {
    return (


      // <nav className="navbar navbar-light bg-light navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">
      //     <img src={logo} alt='' width="200" height="40" className="d-inline-block align-top" />
      //   </Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //         <Link to="/" className="nav-link dropdown-toggle">Elements</Link>
      //       <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      //         <a className="dropdown-item" href="/">Action</a>
      //         <a className="dropdown-item" href="/">Another action</a>
      //         <a className="dropdown-item" href="/">Something else here</a>
      //       </div>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/create" className="nav-link">Tracks</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/" className="nav-link">Programs</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>


      // <Container>
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
                <NavDropdown title="Tracks" id="element-dropdown">
                  <NavDropdown.Item href="/elements/create">Create Track</NavDropdown.Item>
                  <NavDropdown.Item href="/elements/edit/:id">Edit Track</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" disabled>Delete Track</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1"disabled>Create Program</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2"disabled>Edit Program</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3"disabled>View Program</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    //  </Container> 
    );
  }
}