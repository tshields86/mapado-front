import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Panel, PanelGroup, ButtonGroup } from 'react-bootstrap';
import ajaxHelpers from 'ajaxHelpers';
import { convertDate, convertTime } from 'Tools';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {activeKey: '1'};
    this.handleSelect = this.handleSelect.bind(this);
    this.panelCategory = this.panelCategory.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    // this.convertDate = this.convertDate.bind(this);
    // this.convertTime = this.convertTime.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
    this.buildTaskList = this.buildTaskList.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  // checks what the task category is in order to color coat the panel
  panelCategory(category) {
    if (category === 'Personal') {
      return "info"
    } else if (category === 'Work') {
      return "warning"
    } else if (category === 'School') {
      return "danger"
    } else {
      return "default"
    }
  }
  updateTask(e) {
    e.preventDefault();
    // redirect to page with edit form
    browserHistory.push({ pathname: `/edit/${e.target.id}` });
  }
  deleteTask(e) {
    e.preventDefault();
    // call close to close the modal window
    this.props.close();
    // delete the task
    ajaxHelpers.deleteTask(e.target.id)
    .then(function(response) {
      console.log('response:',response);
    });
  }
  sortTasks(array) {
    function convert(task) {
      let { date, time } = task;
      if (time) {
        time = time.split(':'); // if time exists split into an array
      }
      let hours = (time[0]) ? time[0] : 0, // if hours set or set to 0
          minutes = (time[1]) ? time[1] : 0; // if minutes set or set to 0
      if (date) {
        date = date.split('-'); // if date exists split into an array
        return new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]), parseInt(hours), parseInt(minutes));
      } else return new Date(3000, 1, 1, parseInt(hours), parseInt(minutes)); // if no date set, push towards end of list and sort time if it exists
    }
    array.sort((a,b)=>{
      return convert(a) - convert(b); // returns the sorted array
    });
  }
  buildTaskList(tasksArray) {
    this.sortTasks(tasksArray); // calling this function first sorts the array
    return tasksArray.map((task, index) => {
      return (
        <Panel key={index} header={task.task} bsStyle={this.panelCategory(task.category)} eventKey={index}>
          <h3 className="task-location">{task.location ? task.location : ''}</h3>
          <h5>{task.address ? task.address : ''}</h5>
          <h4>{task.date ? convertDate(task.date) : ''}</h4>
          <h4>{task.time ? convertTime(task.time) : ''}</h4>
          <h4>{task.description ? task.description : ''}</h4>
          <h5>{task.phone ? task.phone : ''}</h5>
          <h5><a href={task.website} target='_blank'>Website</a></h5>
          <ButtonGroup>
            <Button id={task._id} onClick={this.deleteTask} bsSize="small">Done</Button>
            <Button id={task._id} onClick={this.updateTask} bsSize="small">Edit</Button>
            <Button id={task._id} onClick={this.deleteTask} bsSize="small">Delete</Button>
          </ButtonGroup>
        </Panel>
      )
    })
  }
  render() {
    return (
      <div>
        <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
          {this.buildTaskList(this.props.tasks)}
        </PanelGroup>
      </div>
    )
  }
}
