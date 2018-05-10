import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { conformsTo, isNumber } from 'lodash'

import Card from 'material-ui/Card'
import CardContent from 'material-ui/Card/CardContent'
import Divider from 'material-ui/Divider'
import moment from 'moment'

import Odds from './Odds'
import Bet from './Bet'
import ValidIcon from './ValidIcon'
import MatchInfos from './MatchInfos'
import Scores from './Scores'

import './Match.scss'

const empty = {}

class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bet: empty,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.bet || this.state.bet === empty) {
      this.setState({
        bet: nextProps.bet || empty,
      })
    }
  }

  isBetValid = () => {
    const scoreValidator = score => isNumber(score) && score >= 0

    return conformsTo(this.state.bet, {
      betTeamA: scoreValidator,
      betTeamB: scoreValidator,
    })
  }

  handleChange = team => ({ target: { value } }) => {
    this.setState(
      {
        bet: {
          ...this.state.bet,
          [`betTeam${team}`]: value,
        },
      },
      this.saveBetIfValid,
    )
  }

  saveBetIfValid = () => {
    if (this.isBetValid()) {
      this.props.saveBet(this.state.bet)
    }
  }

  betSaved = () =>
    this.isBetValid() &&
    this.state.bet.betTeamA === this.props.bet.betTeamA &&
    this.state.bet.betTeamB === this.props.bet.betTeamB

  handleTeamAChange = this.handleChange('A')
  handleTeamBChange = this.handleChange('B')

  render() {
    const { match, teamA, teamB } = this.props
    const { bet } = this.state
    const past = moment(match.dateTime).isBefore(new Date())

    return (
      <Card className="match-card">
        <CardContent className="match-content">
          <div className="match-teams">
            <Bet
              team={teamA}
              betValue={bet.betTeamA}
              onBetValueUpdated={this.handleTeamAChange}
              past={past}
            />
            <Bet
              team={teamB}
              betValue={bet.betTeamB}
              onBetValueUpdated={this.handleTeamBChange}
              past={past}
            />
          </div>
          {!past && <Odds {...match.odds} teamA={teamA} teamB={teamB} />}
          <Scores {...match} />
          <Divider />
          <MatchInfos match={match} />
          {!past && <ValidIcon valid={this.betSaved()} />}
        </CardContent>
      </Card>
    )
  }
}

Match.defaultProps = {
  match: {},
  teamA: {},
  teamB: {},
}

Match.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.instanceOf(Date).isRequired,
    scores: PropTypes.shape({}),
  }),
  teamA: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  bet: PropTypes.shape({
    betTeamA: PropTypes.number,
    betTeamB: PropTypes.number,
  }),
  saveBet: PropTypes.func.isRequired,
}

Match.defaultProps = {
  bet: empty,
}

export default Match
