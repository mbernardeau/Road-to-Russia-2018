import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './Matches.scss';
import Match from './Match';

const Matches = ({ matches }) => (
  <div className={styles.container}>
    {
      _.reverse(_.map(matches, (match, key) => <Match match={match} key={key} matchId={key} />))
    }
  </div>
);

Matches.propTypes = {
  matches: PropTypes.object,
};

export default Matches;
