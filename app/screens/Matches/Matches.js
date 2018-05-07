import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import Match from './Match'

import './matches.scss'

const Matches = ({ matches }) => (
  <div className="matches-container">
    {map(matches, (match, key) => <Match match={match} key={key} matchId={key} />)}
  </div>
)

Matches.propTypes = {
  matches: PropTypes.object,
}

export default Matches
