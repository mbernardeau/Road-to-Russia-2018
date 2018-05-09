import { createSelector } from 'reselect'
import filter from 'lodash/filter'
import groupsReducer from './groups'
import { getUserId } from '../user'

export const getGroupsForUserAdmin = state =>
  groupsReducer.getBy('createdBy', getUserId(state))(state)

export const getGroupsForUserMember = createSelector(
  getUserId,
  groupsReducer.get(),
  (userId, groups) => filter(groups, g => g.members && g.members[userId]),
)

export const getGroupsForUserAwaitingMember = createSelector(
  getUserId,
  groupsReducer.get(),
  (userId, groups) => filter(groups, g => g.awaitingMembers && g.awaitingMembers[userId]),
)

export const getGroupsForUser = createSelector(
  getGroupsForUserMember,
  getGroupsForUserAwaitingMember,
  (groupsMember, groupsAwaiting) => ({ ...groupsMember, ...groupsAwaiting }),
)
