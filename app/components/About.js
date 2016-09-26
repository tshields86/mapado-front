import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Jumbotron, Button, Modal, Header, Footer, Body } from 'react-bootstrap';


class About extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true
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
  componentWillUnmount() {
    this.setState({ showModal: true });
  }
  render() {
    let list = ['React', 'Node', 'Express', 'Webpack', 'Bootstrap', 'Sass', 'Google Maps API'];
    let li = list.map(function(item, index) {
      return <li key={index}>{item}</li>
    });
    return (
      <div>
        <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="about-body">
              <h1><strong>Mapado</strong></h1>
              <h4>A visual task manager for everyday use</h4>
              <h3>Technologies</h3>
              <ul className="list-unstyled">
              {li}
              </ul>
              <h3><strong><a className="website" href="http://www.travis-shields.com" target="_blank">Travis Shields</a></strong></h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default About;
