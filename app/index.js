import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';

// App Styles
// import 'style!css!sass!applicationStyles'
import 'applicationStyles';

ReactDOM.render(
  routes,
  document.getElementById('react-app')
);
