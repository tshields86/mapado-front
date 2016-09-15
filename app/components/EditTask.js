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
  handleAutoChange() {
    // this is called onBlur and allows to setState after autocomplete
    setTimeout(_=>{
      let autoLocation = document.getElementById('searchTextField').value;
      // console.log('autoLocation in AddTask:',autoLocation);
      this.setState({location: autoLocation});

      ajaxHelpers.geoCode(autoLocation) // set the lat and lng for defined locations
      .then((response)=>{
        // console.log(`response from geocode:`, response);
        let { lat, lng } = response.data.results[0].geometry.location;
        // console.log("inside ajax geoCode: lat", lat, "lng", lng);
        if (!lat && !lng) this.setState({lat: '', lng: ''})
        else this.setState({lat: lat, lng: lng});
      })

    },0);
  }
  // checks for validation of a task
  checkValidation() {
    if (this.state.task) this.setState({validation: 'success'});
    else this.setState({validation: 'error'});
  }
  // axios put to the backend
  updateTask() {
    let { task, location, date, time, category, description, lat, lng } = this.state;
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
        lng: lng
      }
    };
    ajaxHelpers.updateTask(taskData)
    .then(function(response){
      console.log('response:', response);
    });
  }
  // submit button functionality
  submit() {
    this.checkValidation();
    if (this.state.task) {
      // axios put
      this.updateTask();
      // invokes close after validating that there is a task and then sending current state of info in the form to the backend
      this.close();
    }
  }
  close() {
    this.setState({ showModal: false });
    setTimeout(() => {
      browserHistory.push('/tasks');
    }, 500);
  }
  // get call to backend for data
  componentWillMount() {
    ajaxHelpers.getTask(this.props.params.taskId)
    .then((response) => {
      this.setState({
        task: response.data.task,
        location: response.data.location,
        date: response.data.date,
        time: response.data.time,
        category: response.data.category,
        description: response.data.description
      });
    });
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
