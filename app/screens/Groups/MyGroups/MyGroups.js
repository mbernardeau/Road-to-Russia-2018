import React from 'react'
import PropTypes from 'prop-types'

import { map, isEmpty } from 'lodash'

import Card from 'material-ui/Card'
import Table, { TableHead, TableRow, TableCell } from 'material-ui/Table'
import TableBody from 'material-ui/Table/TableBody'
import Typography from 'material-ui/Typography'

import GroupRow from './GroupRow'

import './MyGroups.scss'

const MyGroups = ({ groups }) =>
  isEmpty(groups) ? null : (
    <Card className="my-groups-card">
      <Typography variant="headline">Mes tribus</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom de la tribu</TableCell>
            <TableCell>Créateur</TableCell>
            <TableCell>Statut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{map(groups, (group, key) => <GroupRow {...group} key={key} />)}</TableBody>
      </Table>
    </Card>
  )

MyGroups.propTypes = {
  groups: PropTypes.objectOf(PropTypes.shape({})),
}

export default MyGroups
