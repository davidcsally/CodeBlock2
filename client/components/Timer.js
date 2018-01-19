import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ seconds }) => (
  <div className="clock">
    <p>{seconds}</p>
  </div>
);

Timer.propTypes = {
  seconds: PropTypes.number,
};

Timer.defaultProps = {
  seconds: 10,
};

export default Timer;
