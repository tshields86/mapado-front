import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import all routes
import Main from 'Main';
import About from 'About';
import ViewTasks from 'ViewTasks';
import AddTask from 'AddTask';
import EditTask from 'EditTask';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About} />
      <Route path="tasks" component={ViewTasks} />
      <Route path="add" component={AddTask} />
      <Route path="edit/:taskId" component={EditTask} />
    </Route>
  </Router>
);

export default routes;
