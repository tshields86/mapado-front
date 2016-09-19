import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'Marker';
import ajaxHelpers from 'ajaxHelpers';
require('../config/env.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      center: null,
      zoom: 15,
      tasks: []
    };
    this.addScript = this.addScript.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.initialize = this.initialize.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this.createMapOptions = this.createMapOptions.bind(this);
    // this.setMarkers = this.setMarkers.bind(this);
  }
  addScript(url, callback) {
    let script = document.createElement( 'script' );
    if(callback) script.onload = callback;
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild( script );
  }
  componentWillMount() {
    // initially load in all tasks from db to set markers
    ajaxHelpers.getTasks()
    .then((response) => {
      // find current location and set to center
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          tasks: response.data.tasks
        });
      });
    });
  }
  componentDidUpdate(){
    console.log("state in componentdidupdate",this.state);
    // once component updates with center, load script and initialize map
    if (this.state.init) {
      let url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
      this.addScript(`${url}${process.env.GAPI_KEY}`, this.initialize);
      // this.setState({ init: false });
      this.markers = []; // set markers as an empty array only once during map initialization
    }
    if (!this.state.init) { // if map has been initialized
      console.log(this.state.init);
      console.log("this.map",this.map);
      // this.markers = [];
      this.markers.forEach((marker)=>{
        marker.setMap(null) // remove all markers to refresh of all tasks in case one is deleted or changed
      })
      this.markers.length = 0; // set array length to 0
      this.state.tasks.forEach((item, index)=> {
        let { task, lat, lng, category } = item;
          if (item.lat && item.lng) {
            let position = {
              lat: lat, lng: lng
            }
            let marker = new google.maps.Marker({
              position: position,
              map: this.map
            })
            this.markers.push(marker)
          }
      })
      console.log("Markers:",this.markers);
    }

  }
  loadScript(){
    // load in the google maps api script with key and places library
    let url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
    this.addScript(`${url}${process.env.GAPI_KEY}`, this.initialize);
  }
  initialize() {
    // callback to set new map after script loads
    this.map = new google.maps.Map(this.refs.map, {
      zoom: this.state.zoom,
      center: this.state.center
    });
    this.setState({ init: false });
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
    // load in all tasks from db to set markers
    ajaxHelpers.getTasks()
    .then((response) => {
      this.setState({
        tasks: response.data.tasks
      });
    });
  }
  // click anywhere on map and it will log the info
  _onClick({x, y, lat, lng, event}) {
    // console.log(x, y, lat, lng, event);
  }
  _onChange({center, zoom, bounds, marginBounds}) {
    // console.log("center:",center, "zoom:",zoom, "bounds:",bounds, "marginBounds:",marginBounds);
  }
  createMapOptions(maps) {
    return {
      // panControl: false,
      // mapTypeControl: false,
      // scrollwheel: false,
      styles: [{ stylers: [{ 'saturation': 25 }, { 'gamma': 0.4 }, { 'lightness': 0 }, { 'visibility': 'on' }] }]
    }
  }
  // setMarkers(array){
  //   console.log("+++++++++++++++++SETTING ALL MARKERS+++++++++++++++++");
  //   let markers = [];
  //   array.forEach((item, index)=> {
  //     let { task, lat, lng, category } = item;
  //       if (item.lat && item.lng) {
  //         let position = {
  //           lat: lat, lng: lng
  //         }
  //         markers.push(
  //           <Marker {...position} className={category} text={''} key={index} />
  //         )
  //       }
  //   })
  //   return markers;
  // }
  render() {
    const { center, zoom } = this.state
    const currentLocation = center;
    if (!center) {
      return (
        <div className="loader"></div> // css spinning wheel while google maps loads
      );
    } else {
      return (
        // <GoogleMap
        // onClick={this._onClick}
        // onChange={this._onChange}
        // bootstrapURLKeys={{
        //   key: process.env.GAPI_KEY,
        //   libraries: 'places'
        // }}
        // options={this.createMapOptions}
        // defaultCenter={center}
        // defaultZoom={zoom}>
        // <Marker {...center} className="Current" text={'ME'}/>
        // {this.setMarkers(this.state.tasks)}
        // </GoogleMap>
        <div id="map" ref="map">This is the map</div>
      );
    }
  }
};
