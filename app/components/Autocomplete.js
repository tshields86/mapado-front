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

  autocomplete.addListener('place_changed', function() {
    let place = autocomplete.getPlace();
    console.log('place:', place);
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
        onBlur={props.handleAutoChange} // this calls fxn in AddTask w/ setTimeout to setState after autocomplete
      />
    </div>
  )
}

export default Autocomplete;
