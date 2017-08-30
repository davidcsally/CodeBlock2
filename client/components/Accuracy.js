import React, { Component } from 'react';

class Accuracy extends Component {
  render() {
    return (
      <div>
        Accuracy: {this.props.accuracy}%
      </div>
    );
  }
}

export default Accuracy;