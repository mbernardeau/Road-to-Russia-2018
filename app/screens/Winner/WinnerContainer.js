import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import keys from 'lodash/keys'
import teamsReducer, { fetchTeams } from 'redux/teams'

import Winner from './Winner'

const mapState = (state, { countries }) => ({
  teams: teamsReducer.get(keys(countries))(state),
})

const mapDispatch =  (dispatch, { countries }) => ({
  load: () => dispatch(fetchTeams(countries)),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['teams'] }))(Winner)
