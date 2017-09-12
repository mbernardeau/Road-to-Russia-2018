import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Match from './Match';

const Matches = ({ matches }) => (
  <div style={styles.container}>
    {
      _.reverse(_.map(matches, (match, key) => <Match match={match} key={key} matchId={key} />))
    }
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '0 15px',
    alignItems: 'center',
  },
};

Matches.propTypes = {
  matches: PropTypes.object,
};

export default Matches;
