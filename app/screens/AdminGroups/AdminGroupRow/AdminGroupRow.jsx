import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from 'material-ui/Table'

const AdminGroupRow = ({ name, joinKey, members }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {members.length} membre{members.length > 1 ? 's' : ''}
    </TableCell>
    <TableCell>{joinKey}</TableCell>
  </TableRow>
)

AdminGroupRow.defaultProps = {
  members: [],
}

AdminGroupRow.propTypes = {
  name: PropTypes.string.isRequired,
  joinKey: PropTypes.string.isRequired,
  members: PropTypes.array,
}

export default AdminGroupRow
