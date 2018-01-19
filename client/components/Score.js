import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ score }) => (
  <div>
    score: {score}
  </div>
);

Score.propTypes = {
  score: PropTypes.number,
};

Score.defaultProps = {
  score: 0,
};

export default Score;
