import React, { Component } from 'react';

class Timer extends Component {
  render() {
    return (
      <div className="clock">
        <p>{this.props.seconds}</p>
      </div>
    );
  }
}

export default Timer;