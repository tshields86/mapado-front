import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, Header, Footer, Body, Title } from 'react-bootstrap';
import Task from 'Task';
import ajaxHelpers from 'ajaxHelpers';

class ViewTasks extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      tasks: []
    };
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ showModal: false });
    // set timeout long enough to see modal disappear
    setTimeout(() => {
      browserHistory.push('/');
    }, 500);
  }
  componentWillMount() {
    ajaxHelpers.getTasks()
    .then((response) => {
      console.log(response);
      this.setState({
        tasks: response.data.tasks
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
            <Modal.Title>Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Task close={this.close} tasks={this.state.tasks} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewTasks;
