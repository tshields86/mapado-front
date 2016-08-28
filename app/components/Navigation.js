import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Header, Brand, Toggle, Collapse, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NaviBar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'}>Mapado</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/about">
                <NavItem eventKey={2} href="#">About</NavItem>
              </LinkContainer>
              <NavDropdown eventKey={3} title="Tasks" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Add Task</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.2}>View Tasks</MenuItem>
              </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" placeholder="Search Location" />
              </FormGroup>
              {' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>

    );
  }
}

export default NaviBar;
