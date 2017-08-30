import React, { Component } from 'react';

class Timer extends Component {
  render() {
    return (
        <div id="clock">
            Timer: {this.props.minutes}:{this.props.seconds}
          </div>
    );
  }
}

export default Timer;