import { connect } from 'react-redux'

import { getProfile, getAuth, getAuthError } from 'redux/user'

import ConnectionWidget from './ConnectionWidget'

export default connect(state => ({
  authError: getAuthError(state),
  auth: getAuth(state),
  user: getProfile(state),
}))(ConnectionWidget)
