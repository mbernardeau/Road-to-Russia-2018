import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableRow } from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import size from 'lodash/size'

const ValidInscriptionRow = ({ name, joinKey, price, members, awaitingMembers }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {size(members)} membre{size(members) > 1 ? 's' : ''}
    </TableCell>
    <TableCell>{size(awaitingMembers) > 0 && `${size(members)} en attente`}</TableCell>
    <TableCell numeric>
      {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
    </TableCell>
    <TableCell>{joinKey}</TableCell>
  </TableRow>
)

ValidInscriptionRow.defaultProps = {
  members: {},
}

ValidInscriptionRow.propTypes = {
  name: PropTypes.string.isRequired,
  joinKey: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  awaitingMembers: PropTypes.objectOf(PropTypes.bool),
  price: PropTypes.number,
}

export default ValidInscriptionRow
