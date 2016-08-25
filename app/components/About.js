import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';


class About extends Component {
  render() {
    return (
      <div>
        <h2>Technologies</h2>
        <h3>Built with React, Node, Express, Bootstrap, Webpack, Bootstrap, Sass</h3>
        <br/><br/>
        <Link to="/">
          <Button bsStyle="info" bsSize="large">Home</Button>
        </Link>
      </div>
    );
  }
}

export default About;
