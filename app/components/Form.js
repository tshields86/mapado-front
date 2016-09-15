import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Feedback, HelpBlock } from 'react-bootstrap';
import Autocomplete from 'Autocomplete';

const Form = (props) => {
  return (
    <form>
      <FormGroup bsSize="large" validationState={props.info.validation}>
        <ControlLabel>Task Name</ControlLabel>
        <FormControl
          type="text"
          name="task"
          value={props.info.task}
          placeholder="Enter task"
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Autocomplete handleChange={props.handleChange} handleAutoChange={props.handleAutoChange} info={props.info} />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="date"
          name="date"
          value={props.info.date}
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="time"
          name="time"
          value={props.info.time}
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup controlId="formControlsSelect">
        <FormControl
          componentClass="select"
          name="category"
          value={props.info.category}
          placeholder="select"
          onChange={props.handleChange}>
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
          value={props.info.description}
          placeholder="Write details here..."
          onChange={props.handleChange}
          />
      </FormGroup>
    </form>
  );
}

export default Form;
