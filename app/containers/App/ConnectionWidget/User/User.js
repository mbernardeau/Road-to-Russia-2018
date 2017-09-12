import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import Radium from 'radium';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class User extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { user, firebase } = this.props;
    const { logout } = firebase;

    return (
      <div style={styles.user}>
        <Avatar src={user.avatarUrl} style={styles.avatar} />

        <span style={styles.username}>{user.displayName}</span>

        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon color="white" /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Se déconnecter" onClick={logout} />
        </IconMenu>
      </div>
    );
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
};

export default Radium(User);
