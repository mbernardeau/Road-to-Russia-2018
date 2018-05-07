import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getUserGroups } from 'redux/groups'

import MyGroups from './MyGroups'

export default compose(
  firebaseConnect([{ path: 'groups' }]),
  connect(state => ({
    groups: getUserGroups(state),
  })),
)(MyGroups)
