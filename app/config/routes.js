import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import all routes
import Main from 'Main';
import About from 'About';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About} />
    </Route>
  </Router>
);

export default routes;
