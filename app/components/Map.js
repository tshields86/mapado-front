import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'Marker';
require('../config/env.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      zoom: 15
    };
    this._onClick = this._onClick.bind(this);
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Location found using HTML5.`,
      });
    });
  }
  // click anywhere on map and it will log the info
  _onClick({x, y, lat, lng, event}) {
    console.log(x, y, lat, lng, event);
  }
  _onChange({center, zoom, bounds, marginBounds}) {
    // console.log("center:",center, "zoom:",zoom, "bounds:",bounds, "marginBounds:",marginBounds);
  }
  render() {
    const { center, zoom } = this.state
    const currentLocation = center;

    if (center) {
      return (
        <GoogleMap
        onClick={this._onClick}
        onChange={this._onChange}
        bootstrapURLKeys={{
          key: process.env.GAPI_KEY
        }}
        defaultCenter={center}
        defaultZoom={zoom}>
        <Marker {...center} text={'You'}/>


        </GoogleMap>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

  }
};

// Map.propTypes = {
//   center: PropTypes.array,
//   zoom: PropTypes.number,
// };
// Map.defaultProps = {
//   center: [39.9526, -75.1652],
//   zoom: 12,
// };
