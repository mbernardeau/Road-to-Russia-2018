import React from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import './WinnerChoice.scss'

const WinnerChoice = ({ teams, userTeam, onValueChange }) => (
  <div className="winner-choice">
    <div className="winner-choice-title" />
    <div className="winner-choice-select-container">
      <Select
        value={userTeam}
        onChange={onValueChange}
        inputProps={{
          name: 'userTeam',
        }}
      >
        {teams.map(team => (
          <MenuItem key={team.id} value={team.id}>
            {team.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  </div>
)

WinnerChoice.defaultProps = {
  teams: [],
}

WinnerChoice.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  userTeam: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

export default WinnerChoice
