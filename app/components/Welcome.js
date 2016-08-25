import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, withRouter } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';


class Welcome extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Mapado</h1>
          <p>A visual task manager for everyday use</p>
          <Link to="/About">
            <Button bsStyle="info" bsSize="large">Learn more</Button>
          </Link>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;
