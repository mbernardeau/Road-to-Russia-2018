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
      members: {
        [userId]: true,
      },
    })
    .then(docRef => docRef.get())
    .then(doc => {
      const newGroup = doc.data()
      const { id } = doc
      dispatch(groupsReducer.add({ ...newGroup, id }))
    })
}

export const fetchGroupsForUserMember = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where(`member.${userId}`, '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const fetchGroupsForUserAdmin = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where(`createdBy`, '==', userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}
