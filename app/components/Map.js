import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import Marker from 'Marker';
import ajaxHelpers from 'ajaxHelpers';
import _ from 'lodash';
require('../config/env.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initMap: true,
      initMarkers: true,
      setMarker: false,
      markerTarget: null,
      center: null,
      zoom: 15,
      tasks: []
    };
    this.addScript = this.addScript.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.initialize = this.initialize.bind(this);
    this.createMapOptions = this.createMapOptions.bind(this);
  }
  addScript(url, callback) {
    let script = document.createElement( 'script' );
    if(callback) script.onload = callback;
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild( script );
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
    this.setState({ initMap: false });
  }
  componentDidMount(){
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
  componentWillReceiveProps() {
    // load in all tasks from db to set markers with
    ajaxHelpers.getTasks()
    .then((response) => {
      if (!_.isEqual(this.state.tasks, response.data.tasks)) { // compare if there are changes to tasks
        let targetTask;
        let newTask = _.filter(response.data.tasks, (obj)=>{ return !_.find(this.state.tasks, obj);}); // find if there has been an new task added
        let editTask = _.filter(this.state.tasks, (obj)=>{ return !_.find(response.data.tasks, obj);}); // find if there is an edited or deleted task
        if (newTask.length === 1) targetTask = newTask[0]._id; // if new task set as target
        else if (editTask.length === 1) targetTask = editTask[0]._id; // if edit or delete task set as target

        this.setState({ // if changes to tasks, setState and change setMarker value to true to notify that markers need to be checked and updated
          tasks: response.data.tasks,
          markerTarget: targetTask,
          setMarker: true
        });
      }
    });
  }
  componentDidUpdate(){
    if (this.state.initMap) { // once component updates with center, load script and initialize map
      let url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
      this.addScript(`${url}${process.env.GAPI_KEY}`, this.initialize); // initialize callback
      this.markers = []; // set markers as an empty array only once during map initialization
    }

    if (!this.state.initMap && this.state.initMarkers) { // if map has been initialized, set markers for first time
      this.state.tasks.forEach((item, index)=> {
        let { task, lat, lng, category, _id } = item;
          if (lat && lng) { // checks if they have coordinates before setting
            let marker = new google.maps.Marker({
              position: { lat: lat, lng: lng },
              map: this.map,
              _id: _id,
              task: task
            })
            this.markers.push(marker)
          }
      })
      this.setState({ initMarkers: false }); // after markers initialized set initMarkers to false
    }

    if (!this.state.initMarkers && this.state.setMarker) { // if markers have been initialized and there is a change in tasks, change a marker
      let findTask = this.state.tasks.find((task, index)=>{ // returns a task from this.state.tasks if it has same _id as markerTarget in order to determine whether to edit/add or delete
        return task._id === this.state.markerTarget;
      })
      if (findTask) { // if findTask - either edit or delete
        let findMarker = this.markers.find((marker)=> { return marker._id == this.state.markerTarget}); // returns the marker from this.markers to determine whether to edit or add
        if (findMarker) { // edit marker
          this.markers.find((marker, index, array)=>{
            if (marker._id == this.state.markerTarget) {
              let { task, lat, lng, category, _id } = findTask;
              marker.task = task; // updates the markers task name
              let newMarker = new google.maps.LatLng(lat, lng); // sets the position for the edited coordinates
              marker.setPosition(newMarker); // changes the marker's position
              array.splice(index, 1, marker); // removes marker from array of this.markers and replaces with edited marker
            }
          })
        } else { // add marker
          let { task, lat, lng, category, _id } = findTask;
            if (lat && lng) { // checks if they have coordinates before setting
              let marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: this.map,
                _id: _id,
                task: task
              })
              this.markers.push(marker) // adds marker to array of this.markers
            }
        }
      } else if (!findTask) { // delete marker
        this.markers.find((marker, index, array)=>{
          if (marker._id == this.state.markerTarget) {
            marker.setMap(null); // removes marker from map
            array.splice(index, 1); // remove marker from this.markers
          }
        })
      }
      this.setState({
        setMarker: false,
        markerTarget: null
      });
    }
  }
  createMapOptions(maps) {
    return {
      // panControl: false,
      // mapTypeControl: false,
      // scrollwheel: false,
      styles: [{ stylers: [{ 'saturation': 25 }, { 'gamma': 0.4 }, { 'lightness': 0 }, { 'visibility': 'on' }] }]
    }
  }
  render() {
    const { center, zoom } = this.state
    const currentLocation = center;
    if (!center) {
      return (
        <div className="loader"></div> // css spinning wheel while google maps loads
      );
    } else {
      return (
        <div id="map" ref="map"></div>
      );
    }
  }
};
