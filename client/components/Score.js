import React, { Component } from 'react';

class Score extends Component {
  render() {
    return (
      <div>
        score: {this.props.score}
      </div>
    );
  }
}

export default Score;