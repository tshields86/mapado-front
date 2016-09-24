import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

import ajaxHelpers from 'ajaxHelpers';
import _ from 'lodash';
import GoogleApiComponent from 'GoogleApiComponent';
require('../config/env.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMap: true,
      loadMarkers: true,
      setMarker: false,
      markerTarget: null,
      center: null,
      zoom: 15,
      tasks: []
    };
    this.loadMap = this.loadMap.bind(this);
    this.pinSymbol = this.pinSymbol.bind(this);
  }
  componentDidMount() {
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
        // if changes to tasks, setState and change setMarker value to true to notify that markers need to be checked and updated
        this.setState({ tasks: response.data.tasks, markerTarget: targetTask, setMarker: true });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { loadMap, loadMarkers, setMarker } = this.state;
    if (loadMap) {
      this.loadMap();
      this.setState({loadMap: false});
    }
    if(!loadMap && loadMarkers) { // initially load all the markers onto the map
      this.state.tasks.forEach((item, index)=> {
        let { task, lat, lng, category, _id } = item;
          if (lat && lng) { // checks if they have coordinates before setting
            let marker = new google.maps.Marker({
              position: { lat: lat, lng: lng },
              map: this.map, _id: _id, task: task,
              icon: this.pinSymbol(category), animation: google.maps.Animation.DROP });
            this.markers.push(marker)
          }
      })
      this.setState({ loadMarkers: false }); // after markers initialized switch loadMarkers to false
    }
    if (!loadMarkers && setMarker) { // if markers have been initialized and there is a change in tasks, amend the set the marker
      // returns a task from this.state.tasks if it has same _id as markerTarget in order to determine whether to edit/add or delete
      let findTask = this.state.tasks.find((task, index)=>{ return task._id === this.state.markerTarget; })
      if (findTask) { // if findTask - either edit or delete
        let findMarker = this.markers.find((marker)=> { return marker._id == this.state.markerTarget}); // returns the marker from this.markers to determine whether to edit or add
        if (findMarker) { // edit marker
          this.markers.find((marker, index, array)=>{
            if (marker._id == this.state.markerTarget) {
              let { task, lat, lng, category, _id } = findTask;
              marker.task = task; // updates the markers task name
              let newSymbol = this.pinSymbol(category);
              marker.setIcon(newSymbol);
              console.log('Edit marker:',marker);
              let newLocation = new google.maps.LatLng(lat, lng); // sets the position for the edited coordinates
              marker.setPosition(newLocation); // changes the marker's position
              array.splice(index, 1, marker); // removes marker from array of this.markers and replaces with edited marker
            }
          })
        } else { // add marker
          let { task, lat, lng, category, _id } = findTask;
            if (lat && lng) { // checks if they have coordinates before setting
              let marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: this.map, _id: _id, task: task,
                icon: this.pinSymbol(category), animation: google.maps.Animation.DROP });
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
  loadMap() {
    if (this.props && this.props.google && this.state.center) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      let { center, zoom } = this.state;
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        styles: [{ stylers: [{ 'saturation': 25 }, { 'gamma': 0.4 }, { 'lightness': 0 }, { 'visibility': 'on' }] }]
      })
      this.map = new maps.Map(this.refs.map, mapConfig);
      let goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: .2,
        strokeColor: 'gold',
        strokeWeight: 2.5,
        anchor: new google.maps.Point(125, 125)
      };
      let marker = new google.maps.Marker({ // set current location
        position: center, map: this.map, name: "Current Location", animation: google.maps.Animation.DROP, icon: goldStar });
      this.markers = []; // set markers as an empty array while map is loading
    }
  }
  pinSymbol(category) {
    function fillPicker(category){
      if (category === 'Personal') return '#bce8f1';
      else if (category === 'Work') return '#faebcc';
      else if (category === 'School') return '#ebccd1';
      else if (category === 'Other') return '#ddd';
      else return '#ddd';
    }
    function strokePicker(category){
      if (category === 'Personal') return '#31708f';
      else if (category === 'Work') return '#8a6d3b';
      else if (category === 'School') return '#a94442';
      else if (category === 'Other') return '#333333';
      else return '#333333';
    }
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: fillPicker(category),
        fillOpacity: 1,
        strokeColor: strokePicker(category),
        strokeWeight: 3.5,
        scale: 1,
        labelOrigin: new google.maps.Point(0,-29)
    };
  }
  render() {
    const { center } = this.state;
    if (!center) {
      return <div className="loader"></div> // css spinning wheel while google maps loads
    } else {
      return (
        <div id="map" ref="map"></div>
      );
    }
  }
};
