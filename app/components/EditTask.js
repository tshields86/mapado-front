import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, Header, Footer, Body, Title } from 'react-bootstrap';
import Form from 'Form';
import ajaxHelpers from 'ajaxHelpers';

class EditTask extends Component {
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
      lng: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.currentTarget;
    const nextState = {};
    nextState[name] = value;
    this.setState(nextState);
  }
  handleAutoChange(place) {
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
  // axios put to the backend
  updateTask() {
    let { task, location, date, time, category, description, lat, lng, address, phone, website  } = this.state;
    const taskData = {
      id: this.props.params.taskId,
      update: {
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
      }
    };
    ajaxHelpers.updateTask(taskData)
    .then(function(response){
    });
  }
  submit() {   // submit button functionality
    this.checkValidation();
    if (this.state.task) {
      this.updateTask(); // axios put
      this.close(); // invokes close after validating that there is a task and then sending current state of info in the form to the backend
    }
  }
  close() {
    this.setState({ showModal: false });
    setTimeout(() => {
      browserHistory.push('/tasks');
    }, 500);
  }

  componentWillMount() { // get call to backend for data
    ajaxHelpers.getTask(this.props.params.taskId)
    .then((response) => {
      let { task, location, date, time, category, description, lat, lng, address, phone, website } = response.data;
      this.setState({
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
      });
    });
  }
  componentWillUnmount() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form handleChange={this.handleChange} handleAutoChange={this.handleAutoChange} info={this.state}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditTask;
