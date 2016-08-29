import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, Header, Footer, Body, Title } from 'react-bootstrap';
import Form from 'Form';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true
    };
    this.close = this.close.bind(this);
    // this.open = this.open.bind(this);
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
  // open() {
  //   this.setState({ showModal: true });
  // }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTask;
