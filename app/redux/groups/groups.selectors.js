import { createSelector } from 'reselect'

import { pickBy, includes, keys, size } from 'lodash'

import { getData } from '../firebase'

import { getUserId } from '../user'

export const getAllGroups = createSelector(getData, ({ groups }) => groups)

export const getUserGroups = createSelector(getAllGroups, getUserId, (groups, uid) =>
  pickBy(groups, g => includes(keys(g.members), uid)),
)

export const getGroupsNotAlreadyJoined = createSelector(getAllGroups, getUserId, (groups, uid) =>
  pickBy(groups, g => !includes(keys(g.members), uid)),
)

export const getUserHasNoGroupsToJoin = createSelector(
  getGroupsNotAlreadyJoined,
  groups => size(groups) === 0,
)
