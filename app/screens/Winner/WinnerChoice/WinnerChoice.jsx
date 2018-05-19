import React from 'react'
import PropTypes from 'prop-types'
import Flag from 'components/Flag'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import find from 'lodash/find'
import { map } from 'lodash'

import './WinnerChoice.scss'

const WinnerChoice = ({ teams, userTeam, onValueChange }) => (
  <div className="winner-choice">
    <div className="winner-choice-title" />
    {FlagTest(teams, userTeam)}
    <div className="winner-choice-select-container">
      <Select
        value={userTeam}
        onChange={onValueChange}
        inputProps={{
          name: 'userTeam',
        }}
      >
        {map(teams, ({ name }, teamId) => 
          <MenuItem key={teamId} value={teamId}>
            {name}
          </MenuItem>
        )}
      </Select>
    </div>
  </div>
)

const FlagTest = (teams, userTeam) => {
  const test = find(teams, team => team.id === userTeam)

  console.log(test)

  // J'ai rajouté if (test) car il semble que la fonction soit appelée 32 fois et les premières fois, test vaut undefined
  // Regarder la console pour voir le problème
  if (test) 
    return <Flag country={test.code} className="winner-choice-flag" />
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
