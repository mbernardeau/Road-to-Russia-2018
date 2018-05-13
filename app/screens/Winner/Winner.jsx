import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

import './Winner.scss'

const Winner = ({ teams }) => (
  <Card className="winner-card">
    <Typography gutterBottom variant="headline" component="h2">
      Choix du vainqueur final
      {teams}
    </Typography>
    <Typography color="textSecondary">Quel pays gagnera la coupe du monde ?</Typography>
    <CardContent>
      <Select value={10}>
        {teams.map(team => (
          <MenuItem value={team.name}>
            {team.name}
          </MenuItem>
        ))}
      </Select>
    </CardContent>
  </Card>
)

Winner.propTypes = {
  teams: PropTypes.objectOf(PropTypes.shape({})),
}

export default Winner
