import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import InlineAvatar from 'components/Avatar/Avatar'
import Typography from '@material-ui/core/Typography'

import OwnRank from './OwnRank'

import './GroupRanking.scss'

class GroupRanking extends Component {
  componentWillMount() {
    this.props.load()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.members !== this.props.members) {
      this.props.load()
    }
  }

  render() {
    const { name, users, userId, ...other } = this.props
    return (
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
                  <TableCell>
                    {(user.score || 0).toLocaleString()} point{user.score > 1 && 's'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

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
  load: PropTypes.func.isRequired,
  members: PropTypes.objectOf(PropTypes.bool).isRequired,
}

export default GroupRanking
