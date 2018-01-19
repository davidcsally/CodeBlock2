import React from 'react';
import Proptypes from 'prop-types';

const Ranking = ({ name, score, accuracy }) => (
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

Ranking.propTypes = {
  name: Proptypes.string.isRequired,
  score: Proptypes.number,
  accuracy: Proptypes.number,
};

Ranking.defaultProps = {
  score: 0,
  accuracy: 0,
};

export default Ranking;
