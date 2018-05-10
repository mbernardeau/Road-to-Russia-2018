import firebase from 'firebase/app'
import keys from 'lodash/keys'
import usersReducer from './users'

export const fetchUser = userId => (dispatch, getState) => {
  if (!userId || usersReducer.hasKey(userId)(getState())) {
    return
  }
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => {
      dispatch(usersReducer.addOrUpdate({ id: userId, ...doc.data() }))
    })
}

export const fetchUsers = userIds => dispatch => {
  keys(userIds).forEach(userId => {
    dispatch(fetchUser(userId))
  })
}
