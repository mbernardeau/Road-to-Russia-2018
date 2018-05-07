import firebase from 'firebase'
import teamsReducer from './teams.reducer'

export const fetchTeam = teamId => dispatch => {
  firebase
    .firestore()
    .collection('teams')
    .doc(teamId)
    .get()
    .then(doc => {
      dispatch(teamsReducer.addOrUpdate({ id: teamId, ...doc.data() }))
    })
}
