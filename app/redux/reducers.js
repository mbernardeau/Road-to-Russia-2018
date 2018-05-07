/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import matches from './matches'
import bets from './bets'
import teams from './teams'
import stadiums from './stadiums'
import nav from './nav'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
}

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      }
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    firebase: firebaseStateReducer,
    nav,
    matches,
    bets,
    teams,
    stadiums,
    ...injectedReducers,
  })
}
