import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import usersFactory, { fetchUser } from 'redux/users'
import {validApply} from 'redux/groups'

import ValidInscriptionRow from './ValidInscriptionRow'

const mapState = (state, { userId }) => ({
  user: usersFactory.get(userId)(state),
})

const mapDispatch = (dispatch, { userId }) => ({
  load: () => dispatch(fetchUser(userId)),
  validApply: () => {
    console.log(2)
  },
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['user'] }))(
  ValidInscriptionRow,
)
