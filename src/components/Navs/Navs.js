import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
function Navs() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link className="ml-2 mr-3" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="ml-5" href="/City">
            City
          </Nav.Link>
          <Nav.Link className="ml-5 mr-3" href="/allspot">
            All TouristSpot
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navs;
