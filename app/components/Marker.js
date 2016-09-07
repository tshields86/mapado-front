import React, { Component } from 'react';

export default class Marker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="marker">
        {this.props.text}
      </div>
    )
  }
}
