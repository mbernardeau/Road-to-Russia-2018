import {
  AUTHENTICATION_STARTED,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
} from '../actions/auth';

const initialState = {
  pending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STARTED: {
      return {
        ...state,
        pending: true,
      };
    }
    case AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        user: action.user,
        pending: false,
      };
    }
    case AUTHENTICATION_FAILURE: {
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
