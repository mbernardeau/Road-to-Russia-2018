import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import JoinGroup from './JoinGroup';

export default compose(
  firebaseConnect([
    { path: 'groups' },
  ]),
  connect(
    ({ firebase: { data: { groups }, auth: { uid } } }) => ({
      groups,
      uid,
    }),
    (dispatch, { firebase }) => ({
      applyInGroup: (uid, { id }) => firebase.set(`users/${uid}/groups/${id}`, true),
    }),
  ),
)(JoinGroup);
