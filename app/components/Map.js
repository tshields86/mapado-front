import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'Marker';
import ajaxHelpers from 'ajaxHelpers';
require('../config/env.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      zoom: 15,
      tasks: []
    };
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
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
    // initially load in all tasks from db to set markers
    ajaxHelpers.getTasks()
    .then((response) => {
      // console.log("response from ajax in maps:",response);
      this.setState({
        tasks: response.data.tasks
      });
    });
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
    // load in all tasks from db to set markers
    ajaxHelpers.getTasks()
    .then((response) => {
      // console.log("response from ajax in maps:",response);
      this.setState({
        tasks: response.data.tasks
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
  setMarkers(array){
    console.log("SETTING ALL MARKERS");
    let markers = [];
    array.forEach((item, index)=>{
      let { task, lat, lng, category } = item;
      console.log("Task:",task,"lat:",lat,"lng:",lng);
      // console.log(`Task: ${task}, lat: ${lat}, lng: ${lng}`);
      if (item.lat && item.lng) {
        let position = {
          lat: lat, lng: lng
        }
        markers.push(
          <Marker {...position} className={category} text={''} key={index} />
        )
      }
    })
    console.log("Markers:",markers);
    return markers;
  }
  render() {
    const { center, zoom } = this.state
    const currentLocation = center;
    // console.log("RENDER IN MAP.js");
    let x = { mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'] };

    if (center) {
      return (
        <GoogleMap
        onClick={this._onClick}
        onChange={this._onChange}
        bootstrapURLKeys={{
          // key: process.env.GAPI_KEY
          key: `${process.env.GAPI_KEY}&libraries=places`
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        mapTypeControlOptions={x}>
        <Marker {...center} className="Current" text={'ME'}/>
        {this.setMarkers(this.state.tasks)}

        </GoogleMap>
      );
    } else {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      );
    }

  }
};
