import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Header, Brand, Toggle, Collapse, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NaviBar extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
      init: true
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.autocomplete = {};
  }
  componentDidUpdate() {
    if (this.props.google && this.state.init) {
      let input = document.getElementById('search'),
      options = {
        types: ['geocode', 'establishment']
      };
      this.autocomplete = new google.maps.places.Autocomplete(input, options);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
          let geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          let circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          this.autocomplete.setBounds(circle.getBounds());
        });
      }
      this.autocomplete.addListener('place_changed', ()=> {
        let place = this.autocomplete.getPlace();
        this.props.handleAutoChange(place)
      });
      this.setState({ init: false })
    } // end of loading autocomplete
  }
  toggleExpanded(expanded) {
    this.setState({ expanded: expanded});
  }
  onClickLink() {
    this.toggleExpanded(false);
  }
  render() {
    return (
      <Navbar inverse
              expanded={this.state.expanded}
              onToggle={this.toggleExpanded}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Mapado</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.onClickLink}>
            <LinkContainer to="/about">
              <NavItem eventKey={1} href="#">About</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={2} title="Tasks" id="basic-nav-dropdown">
              <LinkContainer to="/add">
                <MenuItem eventKey={2.1}>Add Task</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer to="/tasks">
                <MenuItem eventKey={2.2}>View Tasks</MenuItem>
              </LinkContainer>
              <LinkContainer to="/">
                <MenuItem eventKey={2.3}>View Map</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl id="search" type="text" placeholder="Search Location"
              name="searchValue" value={this.props.data.searchValue} onChange={this.props.handleChange} />
            </FormGroup>
            {' '}
            <Button type="submit" onClick={this.props.handleSubmit}>Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NaviBar;
