import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Header, Brand, Toggle, Collapse, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NaviBar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'}>Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/About">
                <NavItem eventKey={2} href="#">About</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="http://www.travis-shields.com" target="_blank">Travis Shields</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    );
  }
}

export default NaviBar;
