import {
  OPEN_MENU,
  CLOSE_MENU,
  TOGGLE_MENU,
} from '../actions';

const initState = {
  open: false,
};

export default (state = initState, action) => {
  const actions = {
    [OPEN_MENU]: () => ({
      ...state,
      open: true,
    }),
    [CLOSE_MENU]: () => ({
      ...state,
      open: false,
    }),
    [TOGGLE_MENU]: () => ({
      ...state,
      open: !state.open,
    }),
  };

  return actions[action.type] ? actions[action.type]() : state;
};
