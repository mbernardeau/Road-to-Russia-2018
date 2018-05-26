import React from 'react'
import PropTypes from 'prop-types'

import { map, isEmpty } from 'lodash'

import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'

import GroupRow from './GroupRow'

import './MyGroups.scss'

const MyGroups = ({ groups, userId }) =>
  isEmpty(groups) ? null : (
    <Card className="my-groups-card">
      <Typography gutterBottom variant="headline">
        Mes tribus
      </Typography>

      {/* Le console.log s'affiche bien mais pas le composant */}
      {map(groups, group => {
        map(group.awaitingMembers, (test, index) => 
          index !== userId ? null : (
            console.log(2),

            <Typography gutterBottom variant="subheading">
              Vous devez 5€ sur la cagnotte !
            </Typography>
          )
        )
      })}

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
  userId: PropTypes.string.isRequired,
}

export default MyGroups
