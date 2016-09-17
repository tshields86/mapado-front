import React, {Component} from 'react';
import { FormControl } from 'react-bootstrap';

const Autocomplete = (props) => {

  let autocomplete = {},
      input = document.getElementById('searchTextField'),
      options = {
    types: ['geocode', 'establishment']
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
  // calls handleAutoChange and passes place obj as argument
  autocomplete.addListener('place_changed', function() {
    let place = autocomplete.getPlace();
    // console.log('place object in Autocomplete:', place);
    // console.log(`lat: ${place.geometry.location.lat()}, lng: ${place.geometry.location.lng()}`);
    props.handleAutoChange(place)
  });

  return (
    <div>
      <FormControl
        id="searchTextField"
        type="text"
        name="location"
        value={props.info.location}
        placeholder="Location"
        onChange={props.handleChange}
      />
    </div>
  )
}

export default Autocomplete;
