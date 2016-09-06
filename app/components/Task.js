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
  render() {
    const taskList = [];
    let key = 1;
    for (let task of this.props.tasks) {
      // console.log('task:',task);
      // console.log('task.task:',task.task);
      let taskName = (
        <h2><strong>{task.task}</strong></h2>
      )
      taskList.push(
        <Panel key={key} header={taskName} bsStyle={this.panelCategory(task.category)} eventKey={key}>
          {this.field(task.location)}
          {this.field(task.date)}
          {this.field(task.time)}
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
    return (
      <div>
        <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
          {taskList}
        </PanelGroup>
      </div>
    )
  }
}
// Some dummy props
Task.defaultProps = {
  task: 'Golf',
  category: 'Personal',
  description: 'Playing 18 with friends',
  date: '2016-08-12',
  location: "NYC",
  time: '10:00'
}



{/*<Panel header={task} bsStyle={this.panelCategory()} eventKey="1">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>
<Panel header={task} eventKey="2">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>
<Panel header={task} bsStyle="info" eventKey="3">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>
<Panel header={task} bsStyle="info" eventKey="4">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>
<Panel header={task} bsStyle="warning" eventKey="5">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>
<Panel header={task} bsStyle="warning" eventKey="6">
  {this.field(this.props.location)}
  {this.field(this.props.date)}
  {this.field(this.props.time)}
  {this.field(this.props.category)}
  {this.field(this.props.description)}
  <ButtonGroup>
    <Button  bsSize="small">Done</Button>
    <Button  bsSize="small">Edit</Button>
    <Button  bsSize="small">Delete</Button>
  </ButtonGroup>
</Panel>*/}
