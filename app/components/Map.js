import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

import ajaxHelpers from 'ajaxHelpers';
import { convertDate, convertTime } from 'Tools';
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
    this.infoWindow = this.infoWindow.bind(this);
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
            let infowindow = this.infoWindow(item);
            marker.addListener('click',_=> infowindow.open(this.map, marker));
            this.markers.push(marker)
          }
      })
      this.setState({ loadMarkers: false }); // after markers initialized switch loadMarkers to false
    }
    if (!loadMarkers && setMarker) { // if markers have been initialized and there is a change in tasks, amend the set the marker
      // returns a task from this.state.tasks if it has same _id as markerTarget in order to determine whether to edit/add or delete
      let findTask = this.state.tasks.find((task, index)=>{ return task._id === this.state.markerTarget; })
      if (findTask) { // if findTask - either edit or delete
        let { task, lat, lng, category, _id } = findTask;
        let findMarker = this.markers.find((marker)=> { return marker._id == this.state.markerTarget}); // returns the marker from this.markers to determine whether to edit or add
        if (findMarker) { // edit marker
          this.markers.find((marker, index, array)=>{
            if (marker._id == this.state.markerTarget) {
              // below will replace the replace the existing marker, but unable to unattach the infowindow and set new content
              // marker.task = task; // updates the markers task name
              // let newSymbol = this.pinSymbol(category);
              // marker.setIcon(newSymbol);
              // let newLocation = new google.maps.LatLng(lat, lng); // sets the position for the edited coordinates
              // marker.setPosition(newLocation); // changes the marker's position
              //
              // array.splice(index, 1, marker); // removes marker from array of this.markers and replaces with edited marker

              marker.setMap(null); // removes marker from map
              array.splice(index, 1); // remove marker from this.markers
            }
          })
          let marker = new google.maps.Marker({ // need to set new marker instead of replace exisiting one to replace the infowindow attached to the event listener
            position: { lat: lat, lng: lng },
            map: this.map, _id: _id, task: task,
            icon: this.pinSymbol(category) });
            let infowindow = this.infoWindow(findTask);
            marker.addListener('click',_=> infowindow.open(this.map, marker));
            this.markers.push(marker) // adds marker to array of this.markers
        } else { // add marker
            if (lat && lng) { // checks if they have coordinates before setting
              let marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: this.map, _id: _id, task: task,
                icon: this.pinSymbol(category), animation: google.maps.Animation.DROP });
                let infowindow = this.infoWindow(findTask);
                marker.addListener('click',_=> infowindow.open(this.map, marker));
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
    if (this.props.container.search) { // only run if a search was submitted
      let { geometry } = this.props.container;
      if (geometry.viewport) { // set by viewport
        this.map.fitBounds(geometry.viewport);
        this.map.setZoom(16);
      } else { // set by coordinates
        this.map.setCenter(geometry.location);
        this.map.setZoom(16);
      }
      this.props.endSearch(); // switch search to false
    }
  }
  loadMap() {
    if (this.props.google && this.state.center) {
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
      let infowindow = new google.maps.InfoWindow({
        content: `<div class="info-window"><div class="title">You are here</div></div>`
      });
      marker.addListener('click',_=> infowindow.open(this.map, marker));
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
  infoWindow(info){
    let { _id, address, category, date, description, time, location, task, phone, website } = info;
    function infoContent() {
      return (
        `<div class="info-window">
        <h4 class="task-name"><div class="${category ? category : 'Other'}">${task}</div></h4>
        <h3 class="task-location">${location ? location : ''}</h3>
        <h5>${address ? address : ''}</h5>
        <h4>${date ? convertDate(date) : ''}</h4>
        <h4>${time ? convertTime(time) : ''}</h4>
        <h4>${description ? description : ''}</h4>
        <h5>${phone ? phone : ''}</h5>
        <h5><a href=${website} target="_blank">${website ? 'Website' : ''}</a></h5>
        </div>`
      )
    }
    let infowindow = new google.maps.InfoWindow({
      content: infoContent(),
      maxWidth: 300
    });
    return infowindow
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
