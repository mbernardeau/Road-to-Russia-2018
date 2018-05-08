import groupsReducer from './groups'

import { getUserId } from '../user'

export const getGroupsForUserAdmin = state =>
  groupsReducer.getBy('createdBy', getUserId(state))(state)
