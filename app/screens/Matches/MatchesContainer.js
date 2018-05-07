import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'
import matchesFactory, { fetchMatchList } from 'redux/matches'

import Matches from './Matches'

const mapState = state => ({
  matches: matchesFactory.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchMatchList()),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['matches'] }))(Matches)
