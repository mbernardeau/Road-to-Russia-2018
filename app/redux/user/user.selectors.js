import {
  createSelector,
} from 'reselect';

import {
  getFirebase,
} from '../firebase';

export const getProfile = createSelector(
  getFirebase,
  (firebase) => firebase.profile,
);

export const getAuth = createSelector(
  getFirebase,
  (firebase) => firebase.auth,
);

export const getAuthError = createSelector(
  getFirebase,
  (firebase) => firebase.authError,
);

export const getUserId = createSelector(
  getAuth,
  (auth) => auth.uid,
);
