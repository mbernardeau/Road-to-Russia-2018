import firebase from 'firebase';
import _ from 'lodash';

export const AUTHENTICATION_STARTED = 'AUTHENTICATION_STARTED';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';


export function authenticate(providerName) {
  return (dispatch) => {
    dispatch(authenticationStarted());
    let provider;

    if (providerName === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerName === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    firebase.auth().signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(authenticationSuccess(user));
        firebase.database().ref(`/users/${user.uid}`).set(
          _.pick(user, ['uid', 'displayName', 'email', 'emailVerified', 'photoURL', 'providerId']
        ));
      })
      .catch((error) => {
        dispatch(authenticationFailure(error));
      });
  };
}

function authenticationStarted() {
  return {
    type: AUTHENTICATION_STARTED,
  };
}

function authenticationSuccess(user) {
  return {
    type: AUTHENTICATION_SUCCESS,
    user,
  };
}

function authenticationFailure(error) {
  return {
    type: AUTHENTICATION_FAILURE,
    error,
  };
}
