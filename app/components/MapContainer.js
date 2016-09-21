import React, {PropTypes, Component} from 'react';
import GoogleApiComponent from 'GoogleApiComponent';
import Map from 'Map';
require('../config/env.js');


export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div className="loader"></div>
    }
    return (
      <div className="map-container">
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: process.env.GAPI_KEY
})(Container)
