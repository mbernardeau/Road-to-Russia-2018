import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardHeader } from 'material-ui/Card';
import { isLoaded } from 'react-redux-firebase';

import Flag from 'components/Flag';
import placeholder from 'components/Placeholder';

import styles from './Match.scss';

const Match = ({ match }) => (
  <Card style={{ marginTop: 7, marginBottom: 7 }}>
    <CardHeader
      title={moment.unix(match.dateTime).format('LLLL')}
    />
    <div className={styles.match}>
      <div className={styles.countryFlag}>
        {match.teamA.name}
        <Flag country={match.teamA.code} style={{ width: 70, height: 40 }} />
      </div>
      <div>-</div>
      <div className={styles.countryFlag}>
        {match.teamB.name}
        <Flag country={match.teamB.code} style={{ width: 70, height: 40 }} />
      </div>
    </div>
  </Card>
);


Match.propTypes = {
  match: PropTypes.shape({
    teamA: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    teamB: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default placeholder({
  isLoaded: ({ match }) => isLoaded(match),
})(Match);
