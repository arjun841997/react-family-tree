import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'


const Header = () => (
  <Navbar bg="light" expand="lg">
  <Navbar.Brand>Family Tree</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/create-family">Create Family</Link></Nav.Link>      
      <Nav.Link><Link to="/about-us">About</Link></Nav.Link>      
    </Nav>    
  </Navbar.Collapse>  
</Navbar>
)

export default Header
