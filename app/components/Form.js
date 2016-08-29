import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Feedback, HelpBlock } from 'react-bootstrap';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      location: '',
      date: '',
      time: '',
      category: '',
      description: ''

    };
    // this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  // }

  handleChange(e) {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <form>
        <FormGroup bsSize="large">
          <ControlLabel>Task Name</ControlLabel>
          <FormControl
            type="text"
            name="task"
            value={this.state.task}
            placeholder="Enter task"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Location"
            onChange={this.handleChange}
            />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <FormControl
            componentClass="select"
            name="category"
            value={this.state.category}
            placeholder="select"
            onChange={this.handleChange}>
            <option disabled="true">Category</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            name="description"
            value={this.state.description}
            placeholder="Write details here..."
            onChange={this.handleChange}
            />
        </FormGroup>
      </form>
    );
  }
}

export default Form;
