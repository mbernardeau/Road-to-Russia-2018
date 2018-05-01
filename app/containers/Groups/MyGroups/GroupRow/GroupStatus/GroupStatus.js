import React from 'react'
import PropTypes from 'prop-types'

import { keys } from 'lodash'

import Chip from 'material-ui/Chip'

const labels = {
  member: 'Membre',
  awaiting: 'En attente',
  admin: 'Admin',
}

const GroupStatus = ({ status }) => <Chip label={labels[status]} />

GroupStatus.propTypes = {
  status: PropTypes.oneOf(keys(labels)),
}

export default GroupStatus
