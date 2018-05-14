import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import teamsReducer, { fetchTeams } from 'redux/teams'
import toArray from 'lodash/toArray'

import WinnerChoice from './WinnerChoice'

const mapState = state => ({
  teams: toArray(teamsReducer.get()(state)),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchTeams()),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['teams'] }))(WinnerChoice)
