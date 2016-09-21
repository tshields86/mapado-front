import React, {Component} from 'react';
import Navigation from 'Navigation';
import Map from 'Map';
import MapContainer from 'MapContainer';

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
          <MapContainer />
          <div className="container text-center">
            {this.props.children}
          </div>
        </div>
      );
  }
};
