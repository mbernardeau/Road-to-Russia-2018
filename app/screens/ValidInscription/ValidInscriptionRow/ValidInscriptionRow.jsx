import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import size from 'lodash/size'

const ValidInscriptionRow = ({ name, price, members }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {size(members)} membre{size(members) > 1 ? 's' : ''}
    </TableCell>
    <TableCell numeric>
      {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
    </TableCell>
    <TableCell>
      <Button variant="raised" color="primary">
        Valider
      </Button>
    </TableCell>
  </TableRow>
)

ValidInscriptionRow.defaultProps = {
  members: {},
}

ValidInscriptionRow.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  price: PropTypes.number,
}

export default ValidInscriptionRow
