import React, { Component } from 'react';
import { Link } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';


class About extends Component {
  render() {
    let list = ['React', 'Node', 'Express', 'Webpack', 'Bootstrap', 'Sass', 'Google Maps API'];
    let li = list.map(function(item) {
      return <li>{item}</li>
    });
    return (
      <div>
        <Jumbotron>
          <h1>Mapado</h1>
          <p>A visual task manager for everyday use</p>
          <h2>Technologies</h2>
          <ul className="list-unstyled">
            {li}
          </ul>
          <Link to="/">
            <Button bsStyle="info" bsSize="large" className="back">Back</Button>
          </Link>
          <p>
            <a href="http://www.travis-shields.com" target="_blank">Travis Shields</a>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
