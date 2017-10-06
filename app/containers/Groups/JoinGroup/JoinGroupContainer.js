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
  getUserHasNoGroupsToJoin,
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
      disabled: getUserHasNoGroupsToJoin(state),
    }),
    (dispatch, { firebase }) => ({
      applyInGroup: (uid, groupId) => firebase.set(`groups/${groupId}/members/${uid}`, 'awaiting'),
    }),
  ),
)(JoinGroup);
