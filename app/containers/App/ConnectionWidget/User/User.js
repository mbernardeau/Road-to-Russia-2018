import React, {
  PureComponent,
} from 'react';
import { pathToJS, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import styles from './User.scss';

@firebaseConnect()
@connect(
  // Map state to props
  ({ firebase }) => ({
    user: pathToJS(firebase, 'profile'),
  })
)
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
      <div className={styles.userContainer}>
        <Avatar src={user.avatarUrl} style={{ marginRight: 10 }} />

        <span className={styles.username}>{user.displayName}</span>

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

export default User;
