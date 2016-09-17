import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, Header, Footer, Body, Title } from 'react-bootstrap';
import Form from 'Form';
import ajaxHelpers from 'ajaxHelpers';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      validation: null,
      task: '',
      location: '',
      date: '',
      time: '',
      category: '',
      description: '',
      lat: '',
      lng: '',
      address: '',
      phone: '',
      website: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  handleChange(e) {
   const { name, value } = e.currentTarget;
   const nextState = {};
   nextState[name] = value;
   this.setState(nextState);
  }
  handleAutoChange(place) {
    // console.log(`From place obj - lat: ${place.geometry.location.lat()}, lng: ${place.geometry.location.lng()}`);
    this.setState({
      location: place.name ? place.name : place.formatted_address,
      address: place.formatted_address ? place.formatted_address : '',
      lat: place.geometry.location.lat() ? place.geometry.location.lat() : '',
      lng: place.geometry.location.lng() ? place.geometry.location.lng() : '',
      phone: place.formatted_phone_number ? place.formatted_phone_number : '',
      website: place.website ? place.website : ''
    })
  }
  // checks for validation of a task
  checkValidation() {
    if (this.state.task) this.setState({validation: 'success'});
    else this.setState({validation: 'error'});
  }
  // axios post to the backend
  addTask() {
    let { task, location, date, time, category, description, lat, lng, address, phone, website  } = this.state;
    const taskData = {
      task: task,
      location: location,
      date: date,
      time: time,
      category: category,
      description: description,
      lat: lat,
      lng: lng,
      address: address,
      phone: phone,
      website: website
    };
    ajaxHelpers.addTask(taskData)
    .then(function(response){
      console.log('response from addTask:', response);
    });
  }
  // submit button functionality
  submit() {
    this.checkValidation();
    if (this.state.task) {
      // axios post
      this.addTask();
      // invokes close after validating that there is a task and then sending current state of info in the form to the backend
      this.close();
    }
  }
  close() {
    this.setState({ showModal: false });
    setTimeout(() => {
      browserHistory.push('/');
    }, 500);
  }
  componentWillUnmount() {
    this.setState({ showModal: true });
    // clear out form here
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form handleChange={this.handleChange} handleAutoChange={this.handleAutoChange} info={this.state} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTask;
