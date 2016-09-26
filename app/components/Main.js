import React, {Component} from 'react';
import Container from 'Container';

export default class Main extends Component {

  render() {
    return (
        <div>
          <Container />
          <div className="container text-center">
            {this.props.children}
          </div>
        </div>
      );
  }
};
