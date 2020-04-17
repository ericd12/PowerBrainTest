import React from 'react';
// import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Dropdown} from 'react-bootstrap';

import logo from "../logo.png";

const NavbarMain = () => {
  return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href="/">
//         <img
//           alt=""
//           className="d-inline-block align-top"
//           height="40"
//           src={logo}
//           width="200"
//         />
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           {/* <Nav.Link href="/">Home</Nav.Link> */}
//           <NavDropdown id="element-dropdown" title="Elements">
//             <NavDropdown.Item href="/elements/create">
//               Create Element
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/elements">
//               Manage Elements
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/formats/create">
//               Create New Dropdown Item
//             </NavDropdown.Item>
//           </NavDropdown>
//           <NavDropdown id="track-dropdown" title="Tracks">
//             <NavDropdown.Item href="/tracks/create">
//               Create Track
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/tracks">Manage Tracks</NavDropdown.Item>
//           </NavDropdown>
//           <NavDropdown id="basic-nav-dropdown" title="Programs">
//             <NavDropdown.Item href="/programs/create">
//               Create Program
//             </NavDropdown.Item>
//             <NavDropdown.Item href="/programs">Edit Program</NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

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
                  <Dropdown.Divider />
                  <NavDropdown title="Create Dropdown Items" id="items-dropdown">
                        <NavDropdown.Item href="/formats/create">Create New Format</NavDropdown.Item>           
                        <NavDropdown.Item href="/categories/create">Create New Category</NavDropdown.Item>           
                        <NavDropdown.Item href="/markets/create">Create New Market</NavDropdown.Item>           
                    </NavDropdown>
                </NavDropdown>
                <NavDropdown title="Tracks" id="track-dropdown">
                  <NavDropdown.Item href="/tracks/create">Create Track</NavDropdown.Item>
                  <NavDropdown.Item href="/tracks">Manage Tracks</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/programs/create">Create Program</NavDropdown.Item>
                  <NavDropdown.Item href="/programs">Edit Program</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      // </Container> 
    );
  }


export default NavbarMain