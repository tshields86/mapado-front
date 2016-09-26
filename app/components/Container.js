import React, {PropTypes, Component} from 'react';
import GoogleApiComponent from 'GoogleApiComponent';
import Navigation from 'Navigation';
import Map from 'Map';
require('../config/env.js');


export class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      geometry: {},
      search: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.endSearch = this.endSearch.bind(this);
  }
  handleChange(e) {
   const { name, value } = e.currentTarget;
   const nextState = {};
   nextState[name] = value;
   this.setState(nextState);
  }
  handleAutoChange(place) {
    this.setState({
      searchValue: `${place.name?place.name:''}, ${place.vicinity?place.vicinity:''}`,
      geometry: place.geometry ? place.geometry : ''
    })
  }
  handleSubmit() { // when hit submit, turn search on to be set in map
    this.setState({ search: true });
  }
  endSearch() { // after map's location is changed, reset all values
    this.setState({
      searchValue: '',
      geometry: {},
      search: false
    });
  }
  render() {
    if (!this.props.loaded) {
      return <div className="loader"></div>
    }
    return (
      <div>
        <div className="navbar">
          <Navigation handleChange={this.handleChange}
            handleAutoChange={this.handleAutoChange}
            handleSubmit={this.handleSubmit}
            data={this.state} google={this.props.google} />
        </div>
        <div className="map-container">
          <Map google={this.props.google} container={this.state} endSearch={this.endSearch} />
        </div>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: process.env.GAPI_KEY
})(Container)
