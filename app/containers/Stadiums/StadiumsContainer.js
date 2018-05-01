import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getStadiums } from 'redux/stadiums'

import Stadiums from './Stadiums'

export default compose(
  firebaseConnect(['stadiums']),
  connect(state => ({
    stadiums: getStadiums(state),
  })),
)(Stadiums)
