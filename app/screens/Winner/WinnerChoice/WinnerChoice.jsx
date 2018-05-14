import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

import './WinnerChoice.scss'

class WinnerChoice extends React.Component {
  state = {
    teamUser: 'hai',
  }

  handleChange = event => {
    this.setState({ [event.target.teamUser]: event.target.value })
  }

  render() {
    const { teams } = this.props

    return (
      <div className="winner-choice">
        <div className="winner-choice-title" />
        <div className="winner-choice-select-container">
          <Select value={this.state.teamUser} onChange={this.handleChange}>
            {teams.map(team => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    )
  }
}

WinnerChoice.defaultProps = {
  teams: [],
}

WinnerChoice.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default onlyUpdateForPropTypes(WinnerChoice)
