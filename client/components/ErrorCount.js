import React from 'react';
import Proptypes from 'prop-types';

const ErrorCount = ({ errors }) => (
  <div id="error">
    Error Count: {errors}
  </div>
);

ErrorCount.propTypes = {
  errors: Proptypes.number,
};

ErrorCount.defaultProps = {
  errors: 0,
};

export default ErrorCount;
