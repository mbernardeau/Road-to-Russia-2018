import { connect } from 'react-redux'

import { getUserId } from 'redux/user'

import GroupRow from './GroupRow'

export default connect(state => ({
  uid: getUserId(state),
}))(GroupRow)
