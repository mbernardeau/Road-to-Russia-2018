import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

class ValidInscriptionRow extends Component {
  render() {
    const {
      user: { displayName, email },
      name,
      price,
    } = this.props

    return (
      <TableRow>
        <TableCell>
          <b>{name}</b>
        </TableCell>
        <TableCell>{displayName}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell numeric>
          {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </TableCell>
        <TableCell>
          <Button variant="raised" color="primary" onClick={this.props.validApply}>
            Valider
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

ValidInscriptionRow.defaultProps = {
  price: 0,
}

ValidInscriptionRow.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  validApply: PropTypes.func.isRequired,
}

export default ValidInscriptionRow
