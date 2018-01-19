import React from 'react';
import PropTypes from 'prop-types';

// used in App.js
const GameOver = ({ refreshView }) => (
  <div className="gameover">
    <h2>GAME OVER</h2>
    <button
      className="btn btn-primary"
      onClick={refreshView}
    >
      Retry
    </button>
  </div>
);

GameOver.propTypes = {
  refreshView: PropTypes.func.isRequired,
};

export default GameOver;
