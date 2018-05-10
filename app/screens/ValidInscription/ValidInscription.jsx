import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import map from 'lodash/map'

import ValidInscriptionRow from './ValidInscriptionRow'

import './ValidInscription.scss'

const ValidInscription = ({ groups }) => (
  <Card className="valid-inscription-card">
    <Typography gutterBottom variant="headline" component="h2">
      Validation des inscriptions
    </Typography>
    <Typography color="textSecondary">
      Retrouvez ici les membres dont il reste encore à valider l&apos;inscription
    </Typography>
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom d&apos;utilisateur</TableCell>
            <TableCell>Adresse e-mail</TableCell>
            <TableCell />
            <TableCell numeric>Droit d&apos;entrée</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {map(groups, (group, key) => <ValidInscriptionRow key={key} {...group} />)}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

ValidInscription.defaultProps = {
  groups: [],
}

ValidInscription.propTypes = {
  groups: PropTypes.array,
}

export default ValidInscription
