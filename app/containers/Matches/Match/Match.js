import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';

import Flag from 'components/Flag';

const Match = ({ match }) => {
  if (!isObject(match.teamA)) {
    return null;
  }
  return (<div style={{ marginTop: 15, height: 70, marginBottom: 15, width: 400 }}>
    <Flag country={match.teamA.code} style={{ width: 70, height: 40 }} /> vs. <Flag country={match.teamB.code} style={{ width: 70, height: 40 }} />
    <br />
  </div>);
};


Match.propTypes = {
  match: PropTypes.shape({
    teamA: PropTypes.shape({
      code: PropTypes.string.isRequired,
    }),
  }),
};

export default Match;
