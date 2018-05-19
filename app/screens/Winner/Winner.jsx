import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import WinnerChoice from './WinnerChoice'

import './Winner.scss'

class Winner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Team: '-Kj2zfp9V5wdpN59exkD',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Team: nextProps.Team,
    })
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      Team: value,
    })
  }

  render() {
    const { Team } = this.state

    return (
      <Card className="winner-card">
        <Typography gutterBottom variant="headline" component="h2">
          Choix du vainqueur final
        </Typography>
        <Typography color="textSecondary">Quel pays gagnera la coupe du monde ?</Typography>
        <CardContent>
          <WinnerChoice userTeam={Team} onValueChange={this.handleChange} />
        </CardContent>
      </Card>
    )
  }
}

Winner.propTypes = {
  Team: PropTypes.string,
}

Winner.defaultProps = {
  Team: '-Kj2zfpFzqykBwiz5dcM',
}

export default Winner
