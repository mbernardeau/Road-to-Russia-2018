/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import thunk from 'redux-thunk'
import firebaseConfig from './firebaseConfig'

import createReducer from './reducers'

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunk, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares)]

  const reduxFirebaseConfig = {
    userProfile: 'users', // firebase root where user profiles are stored
    enableLogging: false, // enable/disable Firebase's database logging
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const firestore = firebase.firestore()
  firestore.settings({
    timestampsInSnapshots: true,
  })

  const createStoreWithFirebase = compose(reactReduxFirebase(firebase, reduxFirebaseConfig))(
    createStore,
  )

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
  /* eslint-enable */

  const store = createStoreWithFirebase(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  )

  // Extensions
  store.injectedReducers = {}

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducers = reducerModule.default
        const nextReducers = createReducers(store.injectedReducers)
        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
