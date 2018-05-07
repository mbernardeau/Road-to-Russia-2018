import { lazyload } from 'react-lazyload'
import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'

import betReducer, { fetchBet, saveBet } from 'redux/bets'
import teamsReducer, { fetchTeam } from 'redux/teams'
import stadiumsReducer, { fetchStadium } from 'redux/stadiums'

import Match from './Match'

const mapState = (state, { matchId, match: { teamA, teamB, stadium } }) => ({
  bet: betReducer.get(matchId)(state),
  teamA: teamsReducer.get(teamA)(state),
  teamB: teamsReducer.get(teamB)(state),
  stadium: stadiumsReducer.get(stadium)(state),
})

const mapDispatch = (dispatch, { matchId, match: { teamA, teamB, stadium } }) => ({
  load: () => {
    dispatch(fetchBet(matchId))
    dispatch(fetchTeam(teamA))
    dispatch(fetchTeam(teamB))
    dispatch(fetchStadium(stadium))
  },
  saveBet: bet => {
    dispatch(saveBet(matchId, bet))
  },
})

export default compose(
  lazyload({
    height: 135,
    once: true,
    offset: 300,
  }),
  connect(mapState, mapDispatch),
  loader({ print: ['bet', 'teamA', 'teamB', 'stadium'] }),
)(Match)
