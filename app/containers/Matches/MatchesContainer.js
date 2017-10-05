import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  matchQuery,
  getMatches,
} from 'redux/matches';

import Matches from './Matches';

export default compose(
  firebaseConnect([
    matchQuery,
  ]),
  connect(
    (state) => ({
      matches: getMatches(state),
    })
  ),
)(Matches);
