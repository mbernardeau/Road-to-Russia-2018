import React from 'react'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import map from 'lodash/map'

import AdminGroupRow from './AdminGroupRow'

import './AdminGroups.scss'

const AdminGroups = ({ groups }) => (
  <Card className="admin-groups-card">
    <Typography gutterBottom variant="headline" component="h2">
      Administration des tribus
    </Typography>
    <Typography color="textSecondary">Retrouvez ici les tribus que vous avez créé</Typography>
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell numeric>Droit d&apos;entrée</TableCell>
            <TableCell>Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{map(groups, (group, key) => <AdminGroupRow key={key} {...group} />)}</TableBody>
      </Table>
    </CardContent>
  </Card>
)

AdminGroups.defaultProps = {
  groups: [],
}

AdminGroups.propTypes = {
  groups: PropTypes.array,
}

export default AdminGroups
