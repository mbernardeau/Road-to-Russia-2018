import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  getUserId,
} from 'redux/user';

import {
  getGroupsNotAlreadyJoined,
  getUserHasGroupsToJoin,
} from 'redux/groups';

import JoinGroup from './JoinGroup';

export default compose(
  firebaseConnect([
    { path: 'groups' },
  ]),
  connect(
    (state) => ({
      groups: getGroupsNotAlreadyJoined(state),
      uid: getUserId(state),
      disabled: getUserHasGroupsToJoin(state),
    }),
    (dispatch, { firebase }) => ({
      applyInGroup: (uid, groupId) => firebase.set(`users/${uid}/groups/${groupId}`, true),
    }),
  ),
)(JoinGroup);
