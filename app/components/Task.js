import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Panel, PanelGroup, ButtonGroup } from 'react-bootstrap';
import ajaxHelpers from 'ajaxHelpers';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeKey: '1'};
    this.handleSelect = this.handleSelect.bind(this);
    this.field = this.field.bind(this);
    this.panelCategory = this.panelCategory.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
    this.buildTaskList = this.buildTaskList.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  field(item) {
    if (item != "") {
      return <h4>{item}</h4>
    }
  }
  // checks what the task category is in order to color coat the panel
  panelCategory(category) {
    if (category === 'Personal') {
      return "info"
    } else if (category === 'Work') {
      return "warning"
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
  convertTime(time) {
    if (!time) return '';
    time = time.split(':');
    let hours = parseInt(time[0]),
        minutes = parseInt(time[1]);
    // calculate
    let timeValue = (hours > 12) ? hours - 12 : hours; // get hours
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
    return timeValue;
  }
  sortTasks(array) {
    function convertDate(task) {
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
      return convertDate(a) - convertDate(b); // returns the sorted array
    });
    // console.log("This is the sorted dates:",array);
  }
  buildTaskList(tasksArray) {
    // console.log("tasksArray:",tasksArray);
    this.sortTasks(tasksArray); // calling this function first sorts the array
    const taskList = [];
    let key = 1;
    for (let task of tasksArray) {
      let taskName = (
        <h2><strong>{task.task}</strong></h2>
      )
      taskList.push(
        <Panel key={key} header={taskName} bsStyle={this.panelCategory(task.category)} eventKey={key}>
          {this.field(task.location)}
          {this.field(task.date)}
          {this.field(this.convertTime(task.time))}
          {this.field(task.category)}
          {this.field(task.description)}
          <ButtonGroup>
            <Button id={task._id} onClick={this.deleteTask} bsSize="small">Done</Button>
            <Button id={task._id} onClick={this.updateTask} bsSize="small">Edit</Button>
            <Button id={task._id} onClick={this.deleteTask} bsSize="small">Delete</Button>
          </ButtonGroup>
        </Panel>
      );
      // increments the key for both the react key and the eventkey
      key++;
    }
    return taskList;
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
