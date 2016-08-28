import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
require('../config/env.js')

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      zoom: 15
    };
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

  render() {
    const { center, zoom } = this.state
    if (center) {
      return (
        <GoogleMap
        bootstrapURLKeys={{
          key: process.env.GAPI_KEY
        }}
        defaultCenter={center}
        defaultZoom={zoom}>
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
