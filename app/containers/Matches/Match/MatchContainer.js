import {
  isLoaded,
  firebaseConnect,
} from 'react-redux-firebase';

import { lazyload } from 'react-lazyload';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import { toDotPath } from 'utils/PathUtils';
import placeholder from 'components/Placeholder';

import {
  getUserId,
} from 'redux/user';

import {
  getData,
} from 'redux/firebase';

import Match from './Match';

const generateFirebasePath = ({ matchId, userId }) => `bets/${matchId}/users/${userId}`;

export default compose(
  lazyload({
    height: 135,
    once: true,
    offset: 300,
  }),
  connect((state) => ({
    userId: getUserId(state),
  })),
  firebaseConnect(
    (props) => ({ path: generateFirebasePath(props) })
  ),
  connect(
    (state, ownProps) => ({
      bet: get(getData(state), toDotPath(generateFirebasePath(ownProps))),
    }),
    (dispatch, { firebase, ...props }) => ({
      saveBet: (newBet) => firebase.set(generateFirebasePath(props), newBet),
    }),
  ),
  placeholder({
    isLoaded: ({ match }) => isLoaded(match),
  })
)(Match);
