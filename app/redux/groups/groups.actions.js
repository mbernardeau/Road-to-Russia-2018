import firebase from 'firebase'
import randomstring from 'randomstring'
import { getUserId } from '../user'
import groupsReducer from './groups'

export const createGroup = group => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .add({
      ...group,
      createdBy: userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      joinKey: randomstring.generate(10),
    })
    .then(docRef => docRef.get())
    .then(doc => {
      const newGroup = doc.data()
      const { id } = doc
      dispatch(groupsReducer.add({ ...newGroup, id }))
    })
}
