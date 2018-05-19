import React from 'react'
import PropTypes from 'prop-types'
import Flag from 'components/Flag'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import find from 'lodash/find'
import { map } from 'lodash'

import './WinnerChoice.scss'

const WinnerChoice = ({ teams, userTeam, onValueChange }) => (
  <div className="winner-choice">
    {FlagTest(teams, userTeam)}
    <div className="winner-choice-select-container">
      <Select
        value={userTeam}
        onChange={onValueChange}
        inputProps={{
          name: 'userTeam',
        }}
      >
        {map(teams, ({ name }, teamId) => (
          <MenuItem key={teamId} value={teamId}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
    {OddTest(teams, userTeam)}
  </div>
)

const FlagTest = (teams, userTeam) => {
  const test = find(teams, team => team.id === userTeam)

  // J'ai rajouté if (test) car il semble que la fonction soit appelée 32 fois et les premières fois, test vaut undefined
  // Regarder la console pour voir le problème
  if (!test) return null

  return <Flag country={test.code} className="winner-choice-flag" />
}

const OddTest = (teams, userTeam) => {
  const test = find(teams, team => team.id === userTeam)

  // Si la variable test est valable (probleme du au chargement asynchrone)
  if (!test) return null

  return (
    <Typography variant="display2" className="winner-choice-odd">
      {test.winOdd}
    </Typography>
  )
}

WinnerChoice.defaultProps = {
  teams: [],
}

WinnerChoice.propTypes = {
  teams: PropTypes.objectOf(PropTypes.shape({})),
  userTeam: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

export default WinnerChoice
