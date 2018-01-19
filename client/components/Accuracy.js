import React from 'react';
import PropTypes from 'prop-types';

const Accuracy = ({ accuracy }) => (
  <div>
    Accuracy: {accuracy}%
  </div>
);

Accuracy.propTypes = {
  accuracy: PropTypes.number,
};

Accuracy.defaultProps = {
  accuracy: 100,
};

export default Accuracy;
