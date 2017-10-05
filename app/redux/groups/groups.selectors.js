import {
  createSelector,
} from 'reselect';

import {
  pickBy,
  includes,
  keys,
  size,
} from 'lodash';

import {
  getData,
} from '../firebase';

import {
  getUserId,
} from '../user';

export const getAllGroups = createSelector(
  getData,
  (data) => data.groups,
);

export const getGroupsNotAlreadyJoined = createSelector(
  getAllGroups,
  getUserId,
  (groups, uid) => pickBy(groups, (g) => !includes(keys(g.awaitingMembers), uid))
);

export const getUserHasGroupsToJoin = createSelector(
  getGroupsNotAlreadyJoined,
  (groups) => size(groups) === 0,
);
