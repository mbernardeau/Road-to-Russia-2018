import firebase from 'firebase/app'
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
