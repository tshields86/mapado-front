import React from 'react';
import Navigation from 'Navigation';


const Main = React.createClass({

  render: function () {
    return (
      <div>
        <Navigation/>
        <div className="container text-center">
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Main;
