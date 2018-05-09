import React from 'react'
import PropTypes from 'prop-types'

import { TableCell, TableRow } from 'material-ui/Table'

import GroupStatus from './GroupStatus'

const GroupRow = ({ name, members, awaitingMembers, createdBy, userId }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      <GroupStatus
        member={members[userId]}
        awaiting={awaitingMembers[userId]}
        admin={createdBy === userId}
      />
    </TableCell>
  </TableRow>
)

GroupRow.defaultProps = {
  members: {},
  awaitingMembers: {},
}

GroupRow.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  awaitingMembers: PropTypes.objectOf(PropTypes.bool),
  userId: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
}

export default GroupRow
