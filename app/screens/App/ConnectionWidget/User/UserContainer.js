import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import betFactory from 'redux/bets'
import { getProfile } from 'redux/user'

import User from './User'

const mapState = state => ({
  user: getProfile(state),
})

const mapDispatch = (dispatch, { firebase: { logout } }) => ({
  logout: () => {
    logout()
    dispatch(betFactory.reset())
  },
})

export default compose(firebaseConnect(), connect(mapState, mapDispatch))(User)
