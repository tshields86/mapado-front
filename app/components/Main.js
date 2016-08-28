import React, {Component} from 'react';
import Navigation from 'Navigation';
import Map from 'Map';

require('../config/env.js')

export default class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <div className="navbar">
            <Navigation />
          </div>
          <div className="map">
            <Map />
          </div>
          <div className="container text-center">
            {this.props.children}
          </div>
        </div>
      );
  }
};
