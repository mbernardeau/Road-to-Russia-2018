import firebase from 'firebase'
import stadiumsReducer from './stadiums.reducer'

export const fetchStadium = stadiumId => dispatch => {
  firebase
    .firestore()
    .collection('stadiums')
    .doc(stadiumId)
    .get()
    .then(doc => {
      dispatch(stadiumsReducer.addOrUpdate({ id: stadiumId, ...doc.data() }))
    })
}

export const fetchStadiumsList = () => dispatch => {
  firebase
    .firestore()
    .collection('stadiums')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const match = doc.data()
        const { id } = doc
        dispatch(stadiumsReducer.addOrUpdate({ ...match, id }))
      })
    })
}
