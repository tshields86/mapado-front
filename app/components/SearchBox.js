import React, {Component} from 'react';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.fillInAddress = this.fillInAddress.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    let input = this.refs.input;
    console.log(this.refs.input);
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    props.autoComplete = new google.maps.places.Autocomplete(input,
    {types: ['geocode']});
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    props.autoComplete.addListener('place_changed', fillInAddress);
  }
  fillInAddress() {
    // Get the place details from the autocomplete object.
    let place = props.autoComplete.getPlace();
    console.log('place:',place);

    for (let component in props.componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      if (props.componentForm[addressType]) {
        let val = place.address_components[i][props.componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }
  geolocate() {
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
        props.autoComplete.setBounds(circle.getBounds());
      });
    }
  }
  componentWillUnmount() {
    // this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
  render() {
    return (
      <div>
        <div id="locationField">
          <input ref="input" {...this.props} type="text" placeholder="Enter the location" onFocus={this.geolocate}/>
        </div>
        <table id="address">
          <tbody>
            <tr>
              <td className="label">Street address</td>
              <td className="slimField"><input className="field" id="street_number"
                    disabled="true"></input></td>
              <td className="wideField" colSpan="2"><input className="field" id="route"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">City</td>
              <td className="wideField" colSpan="3"><input className="field" id="locality"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td className="slimField"><input className="field"
                    id="administrative_area_level_1" disabled="true"></input></td>
              <td className="label">Zip code</td>
              <td className="wideField"><input className="field" id="postal_code"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">Country</td>
              <td className="wideField" colSpan="3"><input className="field"
                    id="country" disabled="true"></input></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
};
SearchBox.propTypes = {
  autoComplete: React.PropTypes.object,
  componentForm: React.PropTypes.object
};
SearchBox.defaultProps = {
  autoComplete: {},
  componentForm: {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  }
};
