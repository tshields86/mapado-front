import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';

// App Styles
// import 'style!css!sass!applicationStyles'
import 'applicationStyles';

let loc = window.location.href
if (!loc.includes('localhost')) { // if not in development on localhost
  if (!loc.includes('https://')) { // if it doesn't have https
  window.location.href = loc.replace('http', 'https'); // switch to secure b/c html geolocation is deprecated in unsecure sites
  }
}

ReactDOM.render(
  routes,
  document.getElementById('react-app')
);
