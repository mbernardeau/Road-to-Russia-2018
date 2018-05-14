import React, { Component } from 'react'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

import WinnerChoice from './WinnerChoice'

import './Winner.scss'

class Winner extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {

    return (
      <Card className="winner-card">
        <Typography gutterBottom variant="headline" component="h2">
          Choix du vainqueur final
        </Typography>
        <Typography color="textSecondary">Quel pays gagnera la coupe du monde ?</Typography>
        <CardContent>
          <WinnerChoice />
        </CardContent>
      </Card>
    )
  }
}

export default Winner
