import { connect } from 'react-redux'
import { compose } from 'redux'
import keys from 'lodash/keys'
import compact from 'lodash/compact'
import orderBy from 'lodash/orderBy'
import usersFactory, { fetchUsers } from 'redux/users'
import { getUserId } from 'redux/user'

import loader from 'hoc-react-loader'

import GroupRanking from './GroupRanking'

const mapState = (state, { members }) => ({
  users: orderBy(
    compact(usersFactory.get(keys(members))(state)),
    ({ points }) => points || 0,
    'desc',
  ),
  userId: getUserId(state),
})

const mapDispatch = (dispatch, { members }) => ({
  load: () => dispatch(fetchUsers(members)),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['users'] }))(GroupRanking)
