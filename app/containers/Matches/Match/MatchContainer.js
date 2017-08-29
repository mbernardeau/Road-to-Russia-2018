import {
  isLoaded,
  firebaseConnect,
} from 'react-redux-firebase';

import { lazyload } from 'react-lazyload';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import { toDotPath } from 'helpers/PathUtils';
import placeholder from 'components/Placeholder';

import Match from './Match';

const generateFirebasePath = ({ matchId, userId }) => `bets/${matchId}/users/${userId}`;

export default compose(
  lazyload({
    height: 150,
    once: true,
    offset: 300,
  }),
  connect(({ firebase: { auth: { uid } } }) => ({
    userId: uid,
  })),
  firebaseConnect(
    (props) => ({ path: generateFirebasePath(props) })
  ),
  connect(
    ({ firebase: { data } }, ownProps) => ({
      bet: get(data, toDotPath(generateFirebasePath(ownProps))),
    }),
    (dispatch, { firebase, ...props }) => ({
      saveBet: (newBet) => firebase.set(generateFirebasePath(props), newBet),
    }),
  ),
  placeholder({
    isLoaded: ({ match }) => isLoaded(match),
  })
)(Match);
