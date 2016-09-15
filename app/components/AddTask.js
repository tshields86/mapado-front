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
      description: ''
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
  handleAutoChange() {
    // this is called onBlur and allows to setState after autocomplete
    setTimeout(_=>{
      let autoLocation = document.getElementById('searchTextField').value;
      console.log('autoLocation:',autoLocation);
      this.setState({location: autoLocation});
    },0);
  }
  // checks for validation of a task
  checkValidation() {
    if (this.state.task) this.setState({validation: 'success'});
    else this.setState({validation: 'error'});
  }
  // axios post to the backend
  addTask() {
    const taskData = {
      task: this.state.task,
      location: this.state.location,
      date: this.state.date,
      time: this.state.time,
      category: this.state.category,
      description: this.state.description
    };
    ajaxHelpers.addTask(taskData)
    .then(function(response){
      console.log('response:', response);
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
