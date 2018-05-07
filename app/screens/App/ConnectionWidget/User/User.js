import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Radium from 'radium'

import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'

class User extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    anchorEl: null,
    open: false,
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { user, firebase } = this.props
    const { logout } = firebase

    return (
      <div style={styles.user}>
        <Avatar src={user.avatarUrl} style={styles.avatar} />

        <span style={styles.username}>{user.displayName}</span>

        <IconButton
          aria-label="Plus"
          aria-owns={this.state.open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon color="white" />
        </IconButton>

        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={logout}>Se déconnecter</MenuItem>
        </Menu>
      </div>
    )
  }
}

const styles = {
  username: {
    color: 'white',
    fontSize: '18px',

    '@media screen and (max-width: 640px)': {
      display: 'none',
    },
  },

  user: {
    display: 'flex',
    alignItems: 'center',
  },

  avatar: {
    marginRight: 10,
  },
}

export default Radium(User)
