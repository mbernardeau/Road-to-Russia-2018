import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createSelector } from 'reselect';

import {
  pickBy,
  keys,
  includes,
  size,
  get,
} from 'lodash';

import JoinGroup from './JoinGroup';

const uidSelector = (state) => get(state, 'firebase.auth.uid');
const groupsSelector = (state) => get(state, 'firebase.data.groups');

const groupFilterSelector = createSelector(
  groupsSelector,
  uidSelector,
  (groups, uid) => pickBy(groups, (g) => !includes(keys(g.awaitingMembers), uid))
);

const hasNoGroupsSelector = createSelector(
  groupFilterSelector,
  (groups) => size(groups) === 0,
);

export default compose(
  firebaseConnect([
    { path: 'groups' },
  ]),
  connect(
    (state) => ({
      groups: groupFilterSelector(state),
      uid: uidSelector(state),
      disabled: hasNoGroupsSelector(state),
    }),
    (dispatch, { firebase }) => ({
      applyInGroup: (uid, groupId) => firebase.set(`users/${uid}/groups/${groupId}`, true),
    }),
  ),
)(JoinGroup);
