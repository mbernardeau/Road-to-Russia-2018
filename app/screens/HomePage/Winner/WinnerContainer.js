import { compose } from 'redux'
import { connect } from 'react-redux'

import { saveWinner } from 'redux/users'
import { getProfile } from 'redux/user'

import Winner from './Winner'

const mapState = state => ({
  Team: getProfile(state).winnerTeam,
})

const mapDispatch = dispatch => ({
  saveWinner: Team => {
    dispatch(saveWinner(Team))
  },
})

export default compose(connect(mapState, mapDispatch))(Winner)
