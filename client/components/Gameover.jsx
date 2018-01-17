import React, { Component } from 'react';

class GameOver extends Component {
  render() {
    return (
      <div className="gameover">
        <h2>GAME OVER</h2>
        <button
          className="btn btn-primary"
          onClick={() => { this.props.refreshView('game') }}
        > Retry </button>
      </div>
    );
  }
}

export default GameOver;
