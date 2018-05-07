import React from 'react'
import PropTypes from 'prop-types'

import { map, isEmpty } from 'lodash'

import Card from 'material-ui/Card'
import Table from 'material-ui/Table'
import TableBody from 'material-ui/Table/TableBody'
import Typography from 'material-ui/Typography'

import GroupRow from './GroupRow'

const MyGroups = ({ groups }) =>
  isEmpty(groups) ? null : (
    <Card style={styles.container}>
      <Typography gutterBottom type="headline">
        Mes groupes
      </Typography>

      <Table>
        <TableBody>{map(groups, (g, key) => <GroupRow group={g} key={key} />)}</TableBody>
      </Table>
    </Card>
  )

const styles = {
  container: {
    width: '90%',
    paddingTop: 15,
  },
}

MyGroups.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
}

export default MyGroups
