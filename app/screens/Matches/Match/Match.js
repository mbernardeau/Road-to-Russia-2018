import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { conformsTo, isNumber } from 'lodash'

import Card, { CardContent } from 'material-ui/Card'

import Divider from 'material-ui/Divider'

import Bet from './Bet'
import ValidIcon from './ValidIcon'
import MatchInfos from './MatchInfos'

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
      teamA: scoreValidator,
      teamB: scoreValidator,
    })
  }

  handleChange = team => ({ target: { value } }) => {
    this.setState(
      {
        bet: {
          ...this.state.bet,
          [`team${team}`]: value,
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
    this.state.bet.teamA === this.props.bet.teamA &&
    this.state.bet.teamB === this.props.bet.teamB

  handleTeamAChange = this.handleChange('A')
  handleTeamBChange = this.handleChange('B')

  render() {
    const { match, teamA, teamB } = this.props
    const { bet } = this.state

    return (
      <Card style={styles.card}>
        <CardContent style={styles.cardContainer}>
          <div style={styles.match}>
            <Bet team={teamA} betValue={bet.teamA} onBetValueUpdated={this.handleTeamAChange} />
            <Bet team={teamB} betValue={bet.teamB} onBetValueUpdated={this.handleTeamBChange} />
          </div>
          <Divider />
          <MatchInfos match={match} />
          <ValidIcon valid={this.betSaved()} />
        </CardContent>
      </Card>
    )
  }
}

const styles = {
  match: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginBottom: 10,
  },

  card: {
    marginTop: 7,
    marginBottom: 7,
    width: '100%',
  },

  cardContainer: {
    position: 'relative',
  },
}

Match.defaultProps = {
  match: {},
  teamA: {},
  teamB: {},
}

Match.propTypes = {
  match: PropTypes.object,
  teamA: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  bet: PropTypes.shape({
    teamA: PropTypes.number,
    teamB: PropTypes.number,
  }),
  saveBet: PropTypes.func.isRequired,
}

Match.defaultProps = {
  bet: empty,
}

export default Match
