import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    let name = this.props.name
    let score = this.props.score
    let accuracy = this.props.accuracy

    if (score === undefined) score = 0
    if (accuracy === undefined) accuracy = 0;

    return (
      <div className="ranking">
        Name: {name}
        <br />
        Score: {score}
        <br />
        Accuracy: {accuracy}
        <br />
        <br />
      </div>
    );
  }
}

export default Ranking;