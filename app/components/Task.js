import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Panel, PanelGroup, ButtonGroup } from 'react-bootstrap';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeKey: '1'};
    this.handleSelect = this.handleSelect.bind(this);
    this.field = this.field.bind(this);
    this.panelCategory = this.panelCategory.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  field(item) {
    if (item != "") {
      return <h4>{item}</h4>
    }
  }
  panelCategory() {
    if (this.props.category == 'Personal') {
      return "info"
    } else if (this.props.category == 'Work') {
      return "warning"
    } else {
      return "default"
    }
  }
  render() {
    const task = (
      <h2><strong>{this.props.task}</strong></h2>
    )
    return (
      <div>
        <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
          <Panel header={task} bsStyle={this.panelCategory()} eventKey="1">
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
          </Panel>
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
