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
      description: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    // this.addTask = this.addTask.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  // checks for validation of a task
  checkValidation() {
    if (this.state.task) this.setState({validation: 'success'});
    else this.setState({validation: 'error'});
  }
  // axios post to the backend
  // addTask() {
  //   const taskData = {
  //     task: this.state.task,
  //     location: this.state.location,
  //     date: this.state.date,
  //     time: this.state.time,
  //     category: this.state.category,
  //     description: this.state.description
  //   };
  //   ajaxHelpers.addTask(taskData)
  //   .then(function(response){
  //     console.log('response:', response);
  //   });
  // }
  // submit button functionality
  submit() {
    this.checkValidation();
    if (this.state.task) {
      // axios post
      // this.addTask();
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
  // get call to backend for data
  componentWillMount() {
  //   ajaxHelpers.getTasks()
  //   .then((response) => {
  //     console.log(response);
  //     this.setState({
  //       tasks: response.data.tasks
  //     });
  //   });
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
            <Form handleChange={this.handleChange} info={this.state}/>
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
