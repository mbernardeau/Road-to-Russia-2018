import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

import './Scores.scss'

const Scores = ({ scores }) => {
  if (!scores) return null
  const { A, B, winner } = scores
  return (
    <div className="scores-container">
      <Typography variant="display2">
        <span className={winner === 'P1' ? 'winner' : ''}>{A}</span>&nbsp;-&nbsp;
        <span className={winner === 'P2' ? 'winner' : ''}>{B}</span>
      </Typography>
    </div>
  )
}

Scores.propTypes = {
  scores: PropTypes.shape({
    A: PropTypes.number.isRequired,
    B: PropTypes.number.isRequired,
    winner: PropTypes.oneOf(['P1', 'P2', 'N']),
  }),
}

export default Scores
