import React from 'react'

import Flag from 'components/Flag'

import PropTypes from 'prop-types'

import { map, range } from 'lodash'

import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

const Bet = ({ team, betValue, onBetValueUpdated }) => (
  <div style={styles.bet}>
    <div style={styles.betTitle}>
      <Flag country={team.code} style={styles.flag} />
      <div style={styles.teamName}>{team.name}</div>
    </div>
    <div style={styles.selectContainer}>
      <Select
        type="number"
        value={betValue || ''}
        renderValue={renderValue}
        onChange={onBetValueUpdated}
      >
        {menuItems}
      </Select>
    </div>
  </div>
)

const styles = {
  bet: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  betTitle: {
    display: 'flex',
  },

  teamName: {
    textAlign: 'center',
    fontSize: '1.3em',
    paddingLeft: '10px',
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  selectValueStyle: {
    textAlign: 'center',
    width: '100%',
  },

  flag: {
    height: '1.3em',
  },
}

/**
 * Render menu items once (from 0 to 10 goals)
 */
const menuItems = map(range(11), n => (
  <MenuItem value={n} key={n}>
    {n}
  </MenuItem>
))

/**
 * Pure mini-component to render inner value of the select field choices
 * @param {number} value Value to render
 *
 * @return {React.ReactElement}
 */
const renderValue = value => <div style={styles.selectValueStyle}>{value}</div>

Bet.defaultProps = {
  team: {},
}

Bet.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  onBetValueUpdated: PropTypes.func.isRequired,
  betValue: PropTypes.number,
}

export default Bet
