import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from 'material-ui/Table'
import size from 'lodash/size'

const AdminGroupRow = ({ name, joinKey, members }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {size(members)} membre{size(members) > 1 ? 's' : ''}
    </TableCell>
    <TableCell>{joinKey}</TableCell>
  </TableRow>
)

AdminGroupRow.defaultProps = {
  members: {},
}

AdminGroupRow.propTypes = {
  name: PropTypes.string.isRequired,
  joinKey: PropTypes.string.isRequired,
  members: PropTypes.array,
}

export default AdminGroupRow
