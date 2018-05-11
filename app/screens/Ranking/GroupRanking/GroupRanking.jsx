import React from 'react'
import PropTypes from 'prop-types'

import Card, { CardContent } from 'material-ui/Card'
import Table, { TableCell, TableBody, TableRow } from 'material-ui/Table'
import InlineAvatar from 'components/Avatar/Avatar'
import Typography from 'material-ui/Typography'

import OwnRank from './OwnRank'

import './GroupRanking.scss'

const GroupRanking = ({ name, users, userId, ...other }) => (
  <Card className="group-ranking-card">
    <CardContent>
      <Typography variant="headline" align="center">
        {name}
      </Typography>
      <OwnRank users={users} userId={userId} {...other} />
      <Table>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} className={user.id === userId ? 'own-ranking-row' : ''}>
              <TableCell>
                <Typography variant="title">#{index + 1}</Typography>
              </TableCell>
              <TableCell>
                <InlineAvatar {...user} />
              </TableCell>
              <TableCell>{(user.score || 0).toLocaleString()} points</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

GroupRanking.defaultProps = {
  users: [],
}

GroupRanking.propTypes = {
  name: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      score: PropTypes.number,
    }),
  ),
  userId: PropTypes.string.isRequired,
}

export default GroupRanking
