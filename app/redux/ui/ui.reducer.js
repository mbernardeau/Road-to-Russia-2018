import { APPLY_GROUP_FAILED, APPLY_GROUP_SUCCESS } from '../groups'
import { RESET_GROUP_APPLY_STATUS } from './ui.actions'
const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case APPLY_GROUP_FAILED:
      return {
        ...state,
        groupapply: {
          status: 'failed',
          reason: action.reason,
        },
      }
    case APPLY_GROUP_SUCCESS:
      return {
        ...state,
        groupapply: {
          status: 'success',
          name: action.name,
        },
      }
    case RESET_GROUP_APPLY_STATUS:
      return {
        ...state,
        groupapply: {},
      }
    default:
      return state
  }
}
