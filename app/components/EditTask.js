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
      console.log('autoLocation:',autoLocation);
      this.setState({location: autoLocation});
    },0);
  }
  // checks for validation of a task
  checkValidation() {
    if (this.state.task) this.setState({validation: 'success'});
    else this.setState({validation: 'error'});
  }
  // axios put to the backend
  updateTask() {
    const taskData = {
      id: this.props.params.taskId,
      update: {
        task: this.state.task,
        location: this.state.location,
        date: this.state.date,
        time: this.state.time,
        category: this.state.category,
        description: this.state.description
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
    console.log('this.props.params.taskId:',this.props.params.taskId);
    ajaxHelpers.getTask(this.props.params.taskId)
    .then((response) => {
      console.log(response);
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
