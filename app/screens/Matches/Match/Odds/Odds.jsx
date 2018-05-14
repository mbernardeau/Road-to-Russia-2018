import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import padStart from 'lodash/padStart'
import { onlyUpdateForPropTypes } from 'recompose'

import './Odds.scss'

const toHex = number => padStart(Math.min(Math.round(Math.abs(number)), 255).toString(16), 2, '0')

const getColor = value => {
  const r = 128 / 13 * (value + 1)
  const g = -128 / 11 * (value - 12)
  return `#${toHex(r)}${toHex(g)}00`
}

const Odds = ({ A, B, N, teamA, teamB }) => (
  <div className="odds-container">
    <Tooltip placement="right" title={`Cote de victoire de l'équipe: ${teamA.name}`}>
      <div className="odd" style={{ backgroundColor: getColor(A) }}>
        {A}
      </div>
    </Tooltip>
    <Tooltip placement="top" title="Cote du match nul">
      <div className="odd" style={{ backgroundColor: getColor(N) }}>
        {N}
      </div>
    </Tooltip>
    <Tooltip placement="left" title={`Cote de victoire de l'équipe: ${teamB.name}`}>
      <div className="odd" style={{ backgroundColor: getColor(B) }}>
        {B}
      </div>
    </Tooltip>
  </div>
)

Odds.propTypes = {
  A: PropTypes.number,
  B: PropTypes.number,
  N: PropTypes.number,
  teamA: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}

export default onlyUpdateForPropTypes(Odds)
