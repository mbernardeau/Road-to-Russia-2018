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

export const fetchGroupsForUser = () => dispatch => {
  dispatch(fetchGroupsForUserMember())
  dispatch(fetchGroupsForUserAwaitingMember())
}

export const fetchGroupsForUserMember = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where(`members.${userId}`, '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const fetchGroupsForUserAwaitingMember = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where(`awaitingMembers.${userId}`, '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const fetchGroupById = id => dispatch => {
  firebase
    .firestore()
    .collection('groups')
    .doc(id)
    .get()
    .then(doc => {
      dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() }))
    })
}

export const fetchGroupsForUserAdmin = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where('createdBy', '==', userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const applyInGroup = code => (dispatch, getState) => {
  const userId = getUserId(getState())
  const db = firebase.firestore()

  db
    .collection('groups')
    .where('joinKey', '==', code)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        dispatch(applyGroupFailed(`Aucune tribu avec le code ${code} n'existe`))
      }
      querySnapshot.forEach(doc => {
        const group = doc.data()
        const { id } = doc

        if (group.members && group.members[userId]) {
          dispatch(applyGroupFailed(`Vous appartenez déjà à la tribu ${group.name}`))
        } else if (group.awaitingMembers && group.awaitingMembers[userId]) {
          dispatch(
            applyGroupFailed(
              `Vous avez déjà fait une demande pour rejoindre la tribu ${group.name}`,
            ),
          )
        } else {
          db
            .collection('groups')
            .doc(id)
            .update({
              [`awaitingMembers.${userId}`]: true,
            })
            .then(() => {
              dispatch(applyGroupSuccess(group.name))
              dispatch(fetchGroupById(id))
            })
        }
      })
    })
}

export const APPLY_GROUP_FAILED = 'APPLY_GROUP_FAILED'

export const applyGroupFailed = reason => ({
  type: APPLY_GROUP_FAILED,
  reason,
})

export const APPLY_GROUP_SUCCESS = 'APPLY_GROUP_SUCCESS'

export const applyGroupSuccess = name => ({
  type: APPLY_GROUP_SUCCESS,
  name,
})
