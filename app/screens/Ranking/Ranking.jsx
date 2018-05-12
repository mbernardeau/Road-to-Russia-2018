import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import GroupRanking from './GroupRanking'

const Ranking = ({ groups }) => (
  <Fragment>{groups.map(group => <GroupRanking key={group.id} {...group} />)}</Fragment>
)

Ranking.defaultProps = {
  groups: [],
}

Ranking.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default Ranking
