import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  populatedDataToJS,
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';

import styles from './Matches.scss';
import Match from './Match';

const populates = [
  { child: 'stadium', root: 'stadiums' },
  { child: 'teamA', root: 'teams' },
  { child: 'teamB', root: 'teams' },
];

@firebaseConnect([
  { path: 'matches', populates },
])
@connect(
  (state) => ({
    matches: populatedDataToJS(state.get('firebase'), 'matches', populates),
  })
)
export default class Matches extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    matches: PropTypes.object,
  }

  render() {
    const { matches } = this.props;

    return (
      <div className={styles.container}>
        {
          _.map(matches, (match, key) => <Match match={match} key={key} matchId={key} />)
        }
      </div>
    );
  }
}
